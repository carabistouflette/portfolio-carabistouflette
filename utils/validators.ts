/**
 * Validation utility functions
 */

/**
 * Validates an email address
 * @param email - Email address to validate
 * @returns Boolean indicating if the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  // RFC 5322 compliant email regex
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(email)
}

/**
 * Validates a phone number
 * @param phone - Phone number to validate
 * @returns Boolean indicating if the phone number is valid
 */
export const isValidPhone = (phone: string): boolean => {
  // Simple phone validation - customize as needed for your region
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  return phoneRegex.test(phone)
}

/**
 * Validates a URL
 * @param url - URL to validate
 * @returns Boolean indicating if the URL is valid
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validates a string has minimum length
 * @param str - String to validate
 * @param minLength - Minimum length required
 * @returns Boolean indicating if the string meets minimum length
 */
export const hasMinLength = (str: string, minLength: number): boolean => {
  return str.length >= minLength
}

/**
 * Validates a string has maximum length
 * @param str - String to validate
 * @param maxLength - Maximum length allowed
 * @returns Boolean indicating if the string meets maximum length
 */
export const hasMaxLength = (str: string, maxLength: number): boolean => {
  return str.length <= maxLength
}

/**
 * Checks if a string contains only alphanumeric characters
 * @param str - String to validate
 * @returns Boolean indicating if the string is alphanumeric
 */
export const isAlphanumeric = (str: string): boolean => {
  return /^[a-zA-Z0-9]+$/.test(str)
}