// src/utils/validators.js
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }
  
  export const validatePassword = (password) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
    return {
      isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
      requirements: {
        minLength: password.length >= minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChar
      }
    }
  }
  
  export const validateName = (name) => {
    return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name)
  }
  
  export const validatePhone = (phone) => {
    const re = /^\+?[1-9]\d{1,14}$/
    return re.test(phone.replace(/\D/g, ''))
  }