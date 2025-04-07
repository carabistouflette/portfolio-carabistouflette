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
        ></textarea>
        <p v-if="errors[field.name]" class="text-red text-sm">{{ errors[field.name] }}</p>
      </div>
    </div>
    
    <!-- Submit button -->
    <div class="flex justify-end">
      <Button 
        type="submit" 
        variant="primary" 
        size="lg"
        :disabled="isSubmitting"
        class="w-full md:w-auto"
      >
        <template v-if="isSubmitting">
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
    <div v-if="formStatus === 'success'" class="p-4 bg-green/20 text-green rounded-lg animate-slide-up">
      <div class="flex items-center">
        <Icon name="heroicons:check-circle" class="w-5 h-5 mr-2" />
        <p>Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.</p>
      </div>
    </div>
    
    <!-- Error message -->
    <div v-if="formStatus === 'error'" class="p-4 bg-red/20 text-red rounded-lg animate-slide-up">
      <div class="flex items-center">
        <Icon name="heroicons:exclamation-circle" class="w-5 h-5 mr-2" />
        <p>Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer plus tard.</p>
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

const props = defineProps<ContactFormProps>();

// Form state
const isSubmitting = ref(false);
const formStatus = ref<'idle' | 'success' | 'error'>('idle');

// Form data
const form = reactive<FormData>(
  props.formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
);

// Validation errors
const errors = reactive<FormErrors>(
  props.formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
);

// Validate form
const validateForm = (): boolean => {
  let isValid = true;

  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });

  props.formFields.forEach(field => {
    if (field.validation.required && !form[field.name]) {
      errors[field.name] = `${field.label} est requis`;
      isValid = false;
    } else if (field.validation.minLength && form[field.name].length < field.validation.minLength) {
      errors[field.name] = `${field.label} doit comporter au moins ${field.validation.minLength} caractères`;
      isValid = false;
    } else if (field.validation.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form[field.name])) {
      errors[field.name] = 'Veuillez entrer un email valide';
      isValid = false;
    }
  });

  return isValid;
};

// Submit form
const submitForm = async () => {
  if (!validateForm()) return;

  try {
    isSubmitting.value = true;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real application, you would send this data to your backend
    console.log('Form submitted:', form);

    // Reset form
    props.formFields.forEach(field => {
      form[field.name] = '';
    });

    formStatus.value = 'success';

    // Reset status after 5 seconds
    setTimeout(() => {
      formStatus.value = 'idle';
    }, 5000);
  } catch (error) {
    console.error('Form submission error:', error);
    formStatus.value = 'error';
  } finally {
    isSubmitting.value = false;
  }
};
</script>