<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <!-- Form fields -->
    <div v-for="(field, index) in formFields" :key="field.name" :class="{ 'grid grid-cols-1 md:grid-cols-2 gap-6': index === 0 }">
      <div class="space-y-2">
        <label :for="field.name" class="block text-subtext0 font-medium">{{ field.label }}</label>
        <input
          v-if="field.type !== 'textarea'"
          :id="field.name"
          v-model="form[field.name]"
          :type="field.type"
          class="w-full px-4 py-3 bg-surface0 border border-surface1 rounded-lg focus:border-mauve transition-all"
          :class="{ 'border-red': errors[field.name] }"
          :placeholder="field.label"
          required
          :aria-invalid="!!errors[field.name]"
          :aria-describedby="errors[field.name] ? `${field.name}-error` : undefined"
        />
        <textarea
          v-else
          :id="field.name"
          v-model="form[field.name]"
          rows="6"
          class="w-full px-4 py-3 bg-surface0 border border-surface1 rounded-lg focus:border-mauve transition-all resize-none"
          :class="{ 'border-red': errors[field.name] }"
          :placeholder="field.label"
          required
          :aria-invalid="!!errors[field.name]"
          :aria-describedby="errors[field.name] ? `${field.name}-error` : undefined"
        ></textarea>
        <p v-if="errors[field.name]" :id="`${field.name}-error`" class="text-red text-sm">{{ errors[field.name] }}</p>
      </div>
    </div>

    <!-- Honeypot field (visually hidden) -->
    <div class="absolute left-[-9999px]" aria-hidden="true">
      <label for="website_url">Website</label>
      <input type="text" id="website_url" name="website_url" tabindex="-1" autocomplete="off">
    </div>
    
    <!-- Submit button -->
    <div class="flex justify-end">
      <Button
        type="submit"
        variant="solid"
        size="lg"
        :disabled="isLoading"
        class="w-full md:w-auto"
      >
        <template v-if="isLoading">
          <Icon name="heroicons:arrow-path" class="w-5 h-5 animate-spin mr-2" />
          Envoi en cours...
        </template>
        <template v-else>
          <Icon name="heroicons:paper-airplane" class="w-5 h-5 mr-2" />
          {{ submitButtonText }}
        </template>
      </Button>
    </div>
    
    <!-- Success message -->
    <div v-if="isSuccess" role="status" aria-live="polite" class="p-4 bg-green/20 text-green rounded-lg animate-slide-up">
      <div class="flex items-center">
        <Icon name="heroicons:check-circle" class="w-5 h-5 mr-2" aria-hidden="true" />
        <p>Message sent successfully!</p> <!-- Updated message -->
      </div>
    </div>
    
    <!-- Error message -->
    <div v-if="error" role="alert" aria-live="assertive" class="p-4 bg-red/20 text-red rounded-lg animate-slide-up">
      <div class="flex items-center">
        <Icon name="heroicons:exclamation-circle" class="w-5 h-5 mr-2" aria-hidden="true" />
        <p>{{ error }}</p> <!-- Display dynamic error -->
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
interface FormField {
  name: string;
  label: string;
  type: string;
  validation: {
    required: boolean;
    minLength?: number;
    email?: boolean;
  };
}

interface ContactFormProps {
  formFields: FormField[];
  submitButtonText: string;
}

// Define types for form and errors
interface FormData {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

// Define expected API response types
interface ApiResponseSuccess {
  success: true;
  message: string;
}

interface ApiResponseError {
  success?: false; // Optional for validation errors from createError
  message?: string; // Optional for validation errors
  data?: FormErrors; // For validation errors
  statusMessage?: string; // From createError
}

type ApiResponse = ApiResponseSuccess | ApiResponseError;


const props = defineProps<ContactFormProps>();

// Form state
const isLoading = ref(false);
const error = ref<string | null>(null);
const isSuccess = ref(false);

// Form data
const form = reactive<FormData>(
  props.formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
);

// Validation errors (will be populated by server response)
const errors = reactive<FormErrors>(
  props.formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
);

// Submit form
// Handles the entire form submission process, including state updates, API call, and error/success handling.
const submitForm = async (event: Event) => {
  isLoading.value = true;
  error.value = null;
  isSuccess.value = false;
  // Reset server-side validation errors before a new submission attempt
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });

  // Get honeypot value directly from the form element
  const formElement = event.target as HTMLFormElement;
  const honeypotInput = formElement.elements.namedItem('website_url') as HTMLInputElement | null;
  // Use nullish coalescing for safety, though the input should exist
  const honeypotValue = honeypotInput?.value ?? '';

  const formData = {
    ...form,
    honeypot: honeypotValue, // Add honeypot field to the payload
  };

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Always parse the JSON body, regardless of the status code,
    const responseData = await response.json(); // Get raw JSON first
// Always parse the JSON body, regardless of the status code,
    // as the server might send error details in the body even for non-2xx responses.
// Always parse the JSON body, regardless of the status code,
    // as the server might send error details in the body even for non-2xx responses.

    if (!response.ok) { // Handle HTTP errors (e.g., 4xx, 5xx)
      // Treat non-OK responses as potential error structures
      const errorResponse = responseData as ApiResponseError;
      
      // Check specifically for validation errors (status 422 with data)
      if (response.status === 422 && errorResponse.data) {
        // Handle validation errors
        Object.assign(errors, errorResponse.data);
// Set a general error message for the user
        error.value = errorResponse.message || errorResponse.statusMessage || 'Please correct the errors in the form.';
      } else {
        // Handle other server errors (e.g., 500) or unexpected formats
        throw new Error(errorResponse.message || errorResponse.statusMessage || `Server error: ${response.status}`);
// Throw an error to be caught by the catch block below
      }
      isSuccess.value = false;
    } else {
      // Handle successful submission (HTTP 2xx status)
      const successResponse = responseData as ApiResponseSuccess;
      isSuccess.value = true;
      // Reset form fields on success
      props.formFields.forEach(field => {
        form[field.name] = '';
      });
      // Optionally reset honeypot field if needed, though it shouldn't hold value
      if (honeypotInput) honeypotInput.value = '';
    }
// Ensures the hidden field is cleared for any subsequent (though unlikely) interactions.

  } catch (err: any) { // Catch network errors or errors thrown from the !response.ok block
    console.error('Form submission error:', err);
    error.value = err.message || 'An error occurred while sending your message. Please check your connection and try again.';
    isSuccess.value = false;
  } finally {
    // Ensure loading state is always reset, whether the submission succeeded or failed.
    isLoading.value = false;
  }
};
</script>