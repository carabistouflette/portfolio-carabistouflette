<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <!-- Form fields -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Name field -->
      <div class="space-y-2">
        <label for="name" class="block text-subtext0 font-medium">Nom</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          class="w-full px-4 py-3 bg-surface0 border border-surface1 rounded-lg focus:border-mauve transition-all"
          :class="{ 'border-red': errors.name }"
          placeholder="Votre nom"
          required
        />
        <p v-if="errors.name" class="text-red text-sm">{{ errors.name }}</p>
      </div>
      
      <!-- Email field -->
      <div class="space-y-2">
        <label for="email" class="block text-subtext0 font-medium">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="w-full px-4 py-3 bg-surface0 border border-surface1 rounded-lg focus:border-mauve transition-all"
          :class="{ 'border-red': errors.email }"
          placeholder="votre.email@example.com"
          required
        />
        <p v-if="errors.email" class="text-red text-sm">{{ errors.email }}</p>
      </div>
    </div>
    
    <!-- Subject field -->
    <div class="space-y-2">
      <label for="subject" class="block text-subtext0 font-medium">Sujet</label>
      <input
        id="subject"
        v-model="form.subject"
        type="text"
        class="w-full px-4 py-3 bg-surface0 border border-surface1 rounded-lg focus:border-mauve transition-all"
        :class="{ 'border-red': errors.subject }"
        placeholder="Sujet de votre message"
        required
      />
      <p v-if="errors.subject" class="text-red text-sm">{{ errors.subject }}</p>
    </div>
    
    <!-- Message field -->
    <div class="space-y-2">
      <label for="message" class="block text-subtext0 font-medium">Message</label>
      <textarea
        id="message"
        v-model="form.message"
        rows="6"
        class="w-full px-4 py-3 bg-surface0 border border-surface1 rounded-lg focus:border-mauve transition-all resize-none"
        :class="{ 'border-red': errors.message }"
        placeholder="Votre message..."
        required
      ></textarea>
      <p v-if="errors.message" class="text-red text-sm">{{ errors.message }}</p>
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
          Envoyer le message
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
// Form state
const isSubmitting = ref(false)
const formStatus = ref<'idle' | 'success' | 'error'>('idle')

// Form data
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Validation errors
const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Validate form
const validateForm = (): boolean => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })
  
  // Validate name
  if (!form.name) {
    errors.name = 'Le nom est requis'
    isValid = false
  } else if (form.name.length < 2) {
    errors.name = 'Le nom doit comporter au moins 2 caractères'
    isValid = false
  }
  
  // Validate email
  if (!form.email) {
    errors.email = 'L\'email est requis'
    isValid = false
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      errors.email = 'Veuillez entrer un email valide'
      isValid = false
    }
  }
  
  // Validate subject
  if (!form.subject) {
    errors.subject = 'Le sujet est requis'
    isValid = false
  } else if (form.subject.length < 5) {
    errors.subject = 'Le sujet doit comporter au moins 5 caractères'
    isValid = false
  }
  
  // Validate message
  if (!form.message) {
    errors.message = 'Le message est requis'
    isValid = false
  } else if (form.message.length < 10) {
    errors.message = 'Le message doit comporter au moins 10 caractères'
    isValid = false
  }
  
  return isValid
}

// Submit form
const submitForm = async () => {
  if (!validateForm()) return
  
  try {
    isSubmitting.value = true
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', form)
    
    // Reset form
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
    
    formStatus.value = 'success'
    
    // Reset status after 5 seconds
    setTimeout(() => {
      formStatus.value = 'idle'
    }, 5000)
  } catch (error) {
    console.error('Form submission error:', error)
    formStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>