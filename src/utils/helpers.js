// src/utils/helpers.js
export const formatCurrency = (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount)
  }
  
  export const formatDate = (date, format = 'dd MMM yyyy') => {
    const d = new Date(date)
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(d)
  }
  
  export const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
  
  export const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  
  export const calculateRiskScore = (project) => {
    let score = 0
    if (project.delayMonths > 6) score += 0.4
    if (project.budgetOverrun > 20) score += 0.3
    if (project.contractorRating < 3) score += 0.3
    return Math.min(1, score)
  }