export const validateForm = (formData, setError, purposeOption) => {
  if (formData.firstName === '') {
    setError((prev) => ({
      ...prev,
      firstName: 'This is required.'
    }))
    return false
  }
  if (!/^[a-zA-Z]+$/.test(formData.firstName)) {
    setError((prev) => ({
      ...prev,
      firstName: 'Cant be number or special characters'
    }))
    return false
  }
  if (formData.lastName === '') {
    setError((prev) => ({
      ...prev,
      lastName: 'This is required.'
    }))
    return false
  }
  if (!/^[a-zA-Z]+$/.test(formData.lastName)) {
    setError((prev) => ({
      ...prev,
      lastName: 'Cant be number or special characters'
    }))
    return false
  }
  if (formData.email === '') {
    setError((prev) => ({
      ...prev,
      email: 'This is required.'
    }))
    return false
  }
  if (/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/.test(formData.email)) {
    setError((prev) => ({
      ...prev,
      email: 'Please enter correct email'
    }))
    return false
  }
  if (formData.company_name === '') {
    setError((prev) => ({
      ...prev,
      company_name: 'This is required.'
    }))
    return false
  }
  if (formData.purpose === purposeOption[0]) {
    setError((prev) => ({
      ...prev,
      purpose: 'Select a option'
    }))
    return false
  }
  if (formData.message === '') {
    setError((prev) => ({
      ...prev,
      message: 'This is required.'
    }))
    return false
  }
  if (formData.phone && !/^[+]?\d+$/.test(formData.phone)) {
    setError((prev) => ({
      ...prev,
      phone: 'Only numbers allowed'
    }))
    return false
  }
  return true
}
