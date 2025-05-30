import { defineEventHandler, readBody, createError } from 'h3';

interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
  // Honeypot field - its name might differ in the actual form
  honeypot?: string; 
}

// Basic email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<ContactRequestBody>(event);

    // 1. Honeypot Check
    // Ensure the honeypot field name matches the one added to the form
    if (body.honeypot && body.honeypot.length > 0) {
      console.log('Honeypot field filled, likely spam.');
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

    // 4. Process Valid Submission (Simulated)
    console.log('Received valid contact form submission:');
    console.log('Name:', body.name);
    console.log('Email:', body.email);
    console.log('Message:', body.message);

    // TODO: Implement actual email sending or database saving logic here

    // 5. Return Success Response
    return { success: true, message: 'Message sent successfully!' };

  } catch (error: any) {
    // Handle potential readBody errors or other unexpected issues
    if (error.statusCode === 422) {
      // Re-throw validation errors to be handled by Nuxt/Nitro error handling
// If it's a validation error we created, re-throw it so the client-side
      // fetch handler can correctly parse the 'data' field containing specific errors.
       throw error;
    }
    
    console.error('Error processing contact form:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'An unexpected error occurred while processing your request.',
    });
  }
});