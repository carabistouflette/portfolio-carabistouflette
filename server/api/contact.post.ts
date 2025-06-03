import { defineEventHandler, readBody, createError } from 'h3';
import { createRateLimiter } from '~/server/utils/rateLimiter';

interface ContactRequestBody {
  name: string;
  email: string;
  subject: string;
  message: string;
  // Honeypot field - its name might differ in the actual form
  honeypot?: string; 
}

// Basic email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Créer le rate limiter pour l'endpoint de contact
const rateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Maximum 3 messages par IP toutes les 15 minutes
  message: 'Trop de messages envoyés. Veuillez réessayer dans 15 minutes.'
});

export default defineEventHandler(async (event) => {
  // Appliquer le rate limiting
  await rateLimiter(event);
  try {
    const body = await readBody<ContactRequestBody>(event);

    // 1. Honeypot Check
    // Ensure the honeypot field name matches the one added to the form
    if (body.honeypot && body.honeypot.length > 0) {
      // Return a generic success response to confuse bots
// Return a generic success response even if the honeypot is filled.
      // This prevents bots from easily identifying that their submission was blocked based on the honeypot field.
      // Or return new Response(null, { status: 200 }); if using native Response
      return { success: true, message: 'Message received.' }; 
    }

    // 2. Validation
    const errors: { [key: string]: string } = {};

    if (!body.name || body.name.trim().length === 0) {
      errors.name = 'Name is required.';
    }
    if (!body.email || body.email.trim().length === 0) {
      errors.email = 'Email is required.';
    } else if (!emailRegex.test(body.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!body.subject || body.subject.trim().length === 0) {
      errors.subject = 'Subject is required.';
    }
    if (!body.message || body.message.trim().length === 0) {
      errors.message = 'Message is required.';
    } else if (body.message.trim().length < 10) { // Basic length check
        errors.message = 'Message should be at least 10 characters long.';
    }

    // 3. Handle Validation Errors
    if (Object.keys(errors).length > 0) {
      throw createError({
        statusCode: 422, // Unprocessable Entity
        statusMessage: 'Validation Failed',
        data: errors, // Send specific field errors back
      });
    }

    // 4. Process Valid Submission
    const recipientEmail = process.env.RECIPIENT_EMAIL || event.context.cloudflare?.env?.RECIPIENT_EMAIL || 'contact@example.com';
    
    // Get the API key from environment
    const resendApiKey = process.env.RESEND_API_KEY || event.context.cloudflare?.env?.RESEND_API_KEY;
    
    if (!resendApiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Email service not configured',
      });
    }

    try {
      // Send email using Resend API
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: recipientEmail,
          subject: body.subject || `Contact from ${body.name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${body.name}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Subject:</strong> ${body.subject || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p>${body.message.replace(/\n/g, '<br>')}</p>
          `,
          reply_to: body.email,
        }),
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        throw new Error('Email service error');
      }

      const result = await emailResponse.json();

      // 5. Return Success Response
      return { success: true, message: 'Message sent successfully!' };
    } catch (emailError) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to send email',
      });
    }

  } catch (error) {
    // Handle potential readBody errors or other unexpected issues
    if (error && typeof error === 'object' && 'statusCode' in error && (error as { statusCode: number }).statusCode === 422) {
      // Re-throw validation errors to be handled by Nuxt/Nitro error handling
// If it's a validation error we created, re-throw it so the client-side
      // fetch handler can correctly parse the 'data' field containing specific errors.
       throw error;
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'An unexpected error occurred while processing your request.',
    });
  }
});