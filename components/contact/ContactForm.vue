<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <!-- Form fields -->
    <template v-for="(field, index) in formFields" :key="field.name">
      <!-- Group name and email in a grid on desktop -->
      <div v-if="index === 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Name field -->
        <div class="form-field space-y-2">
          <label :for="field.name" class="form-label">{{ field.label }}</label>
          <div class="form-input-wrapper">
            <input
              :id="field.name"
              v-model="form[field.name]"
              :type="field.type"
              class="form-input"
              :class="{ 'form-input-error': errors[field.name] }"
              :placeholder="field.label"
              required
              :aria-invalid="!!errors[field.name]"
              :aria-describedby="errors[field.name] ? `${field.name}-error` : undefined"
              @focus="handleFocus(field.name)"
              @blur="handleBlur(field.name)"
            />
            <div class="form-input-underline"></div>
          </div>
          <p v-if="errors[field.name]" :id="`${field.name}-error`" class="text-red text-sm">{{ errors[field.name] }}</p>
        </div>
        
        <!-- Email field (second field) -->
        <div v-if="formFields[1]" class="form-field space-y-2">
          <label :for="formFields[1].name" class="form-label">{{ formFields[1].label }}</label>
          <div class="form-input-wrapper">
            <input
              :id="formFields[1].name"
              v-model="form[formFields[1].name]"
              :type="formFields[1].type"
              class="form-input"
              :class="{ 'form-input-error': errors[formFields[1].name] }"
              :placeholder="formFields[1].label"
              required
              :aria-invalid="!!errors[formFields[1].name]"
              :aria-describedby="errors[formFields[1].name] ? `${formFields[1].name}-error` : undefined"
              @focus="handleFocus(formFields[1].name)"
              @blur="handleBlur(formFields[1].name)"
            />
            <div class="form-input-underline"></div>
          </div>
          <p v-if="errors[formFields[1].name]" :id="`${formFields[1].name}-error`" class="text-red text-sm">{{ errors[formFields[1].name] }}</p>
        </div>
      </div>
      
      <!-- Skip email field as it's already rendered -->
      <template v-else-if="index !== 1">
        <div class="form-field space-y-2">
          <label :for="field.name" class="form-label">{{ field.label }}</label>
          <div class="form-input-wrapper">
            <input
              v-if="field.type !== 'textarea'"
              :id="field.name"
              v-model="form[field.name]"
              :type="field.type"
              class="form-input"
              :class="{ 'form-input-error': errors[field.name] }"
              :placeholder="field.label"
              required
              :aria-invalid="!!errors[field.name]"
              :aria-describedby="errors[field.name] ? `${field.name}-error` : undefined"
              @focus="handleFocus(field.name)"
              @blur="handleBlur(field.name)"
            />
            <textarea
              v-else
              :id="field.name"
              v-model="form[field.name]"
              rows="6"
              class="form-input form-textarea"
              :class="{ 'form-input-error': errors[field.name] }"
              :placeholder="field.label"
              required
              :aria-invalid="!!errors[field.name]"
              :aria-describedby="errors[field.name] ? `${field.name}-error` : undefined"
              @focus="handleFocus(field.name)"
              @blur="handleBlur(field.name)"
            ></textarea>
            <div class="form-input-underline"></div>
          </div>
          <p v-if="errors[field.name]" :id="`${field.name}-error`" class="text-red text-sm">{{ errors[field.name] }}</p>
        </div>
      </template>
    </template>

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
        <p>Message envoyé avec succès !</p> <!-- Updated message -->
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

// Focus state tracking
const focusedField = ref<string | null>(null);

// Input handlers
const handleFocus = (fieldName: string) => {
  focusedField.value = fieldName;
};

const handleBlur = (fieldName: string) => {
  if (focusedField.value === fieldName) {
    focusedField.value = null;
  }
};

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

<style scoped>
/* Form field wrapper */
.form-field {
  position: relative;
  animation: fieldFadeIn var(--animation-base) var(--ease-out) forwards;
  opacity: 0;
}

.form-field:nth-child(1) { animation-delay: 0.1s; }
.form-field:nth-child(2) { animation-delay: 0.2s; }
.form-field:nth-child(3) { animation-delay: 0.3s; }
.form-field:nth-child(4) { animation-delay: 0.4s; }

@keyframes fieldFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
  from {
    opacity: 0;
    transform: translateY(10px);
  }
}

/* Form label */
.form-label {
  @apply block text-subtext0 font-medium mb-2;
  transition: color var(--animation-fast) var(--ease-out);
}

.form-input-wrapper:focus-within .form-label {
  color: var(--mauve);
}

/* Form input wrapper */
.form-input-wrapper {
  @apply relative;
}

/* Form input base styles */
.form-input {
  @apply w-full px-4 py-3 bg-surface0 border border-surface1 rounded-lg;
  @apply transition-all duration-300 ease-out;
  outline: none;
  position: relative;
  z-index: 1;
}

.form-textarea {
  @apply resize-none;
}

/* Input states */
.form-input:hover {
  @apply border-surface2;
  background: rgba(var(--surface0-rgb, 49, 50, 68), 0.8);
}

.form-input:focus {
  @apply border-transparent;
  background: rgba(var(--surface0-rgb, 49, 50, 68), 0.6);
  box-shadow: 0 4px 20px -5px rgba(203, 166, 247, 0.3);
}

.form-input-error {
  @apply border-red;
  animation: inputShake 0.4s var(--ease-out);
}

@keyframes inputShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* Animated underline */
.form-input-underline {
  @apply absolute bottom-0 left-0 h-0.5 w-full;
  background: linear-gradient(90deg, var(--mauve), var(--blue), var(--lavender));
  background-size: 200% 100%;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform var(--animation-base) var(--ease-out);
  border-radius: 9999px;
}

.form-input:focus ~ .form-input-underline {
  transform: scaleX(1);
  animation: underlineGradient 3s linear infinite;
}

@keyframes underlineGradient {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

/* Error message animation */
.form-field p {
  animation: errorSlide var(--animation-fast) var(--ease-out);
}

@keyframes errorSlide {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Success/Error message animations */
.animate-slide-up {
  animation: slideUp var(--animation-base) var(--ease-out);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Submit button loading state */
.form-field button[disabled] {
  cursor: not-allowed;
  opacity: 0.7;
}

/* Placeholder animation */
.form-input::placeholder {
  color: var(--overlay0);
  transition: opacity var(--animation-fast) var(--ease-out);
}

.form-input:focus::placeholder {
  opacity: 0.5;
}

/* Focus visible for accessibility */
.form-input:focus-visible {
  box-shadow: 
    0 0 0 3px rgba(203, 166, 247, 0.3),
    0 4px 20px -5px rgba(203, 166, 247, 0.3);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .form-field,
  .form-input,
  .form-input-underline,
  .form-field p {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
  
  .form-input-error {
    animation: none;
  }
}
</style>