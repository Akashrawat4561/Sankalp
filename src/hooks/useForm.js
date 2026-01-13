// src/hooks/useForm.js
import { useState, useCallback } from 'react'

export const useForm = (initialState, validate) => {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    if (touched[name]) {
      const validationErrors = validate ? validate({ ...values, [name]: value }) : {}
      setErrors(prev => ({ ...prev, [name]: validationErrors[name] }))
    }
  }, [touched, validate, values])

  const handleBlur = useCallback((e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    
    if (validate) {
      const validationErrors = validate(values)
      setErrors(prev => ({ ...prev, [name]: validationErrors[name] }))
    }
  }, [validate, values])

  const resetForm = useCallback(() => {
    setValues(initialState)
    setErrors({})
    setTouched({})
  }, [initialState])

  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }))
  }, [])

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    resetForm,
    setFieldValue,
    setErrors
  }
}