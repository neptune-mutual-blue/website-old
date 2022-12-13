
export const validateForm = (formData, setError) => {
  if (formData.firstName === '') {
    setError(() => ({
      // ...prev,
      firstName: 'This is required.'
    }))
    return false
  }

  if (!/^[a-zA-Z]+$/.test(formData.firstName)) {
    setError(() => ({
      // ...prev,
      firstName: 'Cant be number or special characters'
    }))
    return false
  }

  if (formData.lastName === '') {
    setError(() => ({
      // ...prev,
      lastName: 'This is required.'
    }))
    return false
  }

  if (!/^[a-zA-Z]+$/.test(formData.lastName)) {
    setError(() => ({
      // ...prev,
      lastName: 'Cant be number or special characters'
    }))
    return false
  }

  if (formData.email === '') {
    setError(() => ({
      // ...prev,
      email: 'This is required.'
    }))
    return false
  }

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!String(formData.email).toLowerCase().match(emailRegex)) {
    setError(() => ({
      // ...prev,
      email: 'Please enter correct email'
    }))
    return false
  }

  if (formData.company_name === '') {
    setError(() => ({
      // ...prev,
      company_name: 'This is required.'
    }))
    return false
  }

  const urlRegex = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi
  if (!String(formData.website).toLowerCase().match(urlRegex)) {
    setError(() => ({
      // ...prev,
      website: 'Please enter a valid website'
    }))
    return false
  }

  // if (formData.purpose === purposeOptions[0]) {
  //   setError(() => ({
  //     purpose: purposeOptions[0].value
  //   }))
  //   return false
  // }

  if (formData.contactMethod.value === '') {
    setError(() => ({
      // ...prev,
      contactMethod: 'Please select an option'
    }))
    return false
  }

  if (formData.contactMethod.value === 'other') {
    if (!formData.contactMethodName) {
      setError(() => ({
        contactMethodName: 'Please enter the contact method'
      }))
      return false
    }

    if (!formData.contactAddress) {
      setError(() => ({
        contactAddress: 'Please enter the contact address'
      }))
      return false
    }
  }

  if (formData.role.value === '') {
    setError(() => ({
      // ...prev,
      role: 'Please select role'
    }))
    return false
  }

  if (formData.blockchain.value === '') {
    setError(() => ({
      // ...prev,
      blockchain: 'Please select blockchain networks'
    }))
    return false
  }

  if (formData.phone && !/^[+]?\d+$/.test(formData.phone)) {
    setError(() => ({
      // ...prev,
      phone: 'Only numbers allowed'
    }))
    return false
  }

  if (formData.message === '') {
    setError(() => ({
      // ...prev,
      message: 'This is required.'
    }))
    return false
  }

  setError()
  return true
}
