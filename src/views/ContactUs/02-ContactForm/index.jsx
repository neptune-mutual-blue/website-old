import { useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import styled from 'styled-components'
import { typography } from '../../../../styles/typography'
import { Button } from '../../../components/Button'
import { Checkbox } from '../../../components/Checkbox'
import { Filter } from '../../../components/Filter'
import { InputWithLabel } from '../../../components/InputWithLabel'
import { TextArea } from '../../../components/TextArea'

const purposeOption = [
  'Select a purpose',
  'This is a test purpose',
  'This is second one'
]

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company_name: '',
    purpose: purposeOption[0],
    phone: '',
    message: ''
  })

  const [error, setError] = useState()

  const [captchaCode, setCaptchaCode] = useState()

  const recaptchaRef = useRef()

  const validateForm = () => {
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

  const onSubmit = (e) => {
    e.preventDefault()
    const validated = validateForm()
    if (validated) {
      console.log(formData)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company_name: '',
        phone: '',
        message: ''
      })
    }
  }

  useEffect(() => {
    setError()
  }, [formData])

  const onReCAPTCHAChange = (captchaCode) => {
    if (!captchaCode) {
      return
    }
    setCaptchaCode(captchaCode)
  }

  return (
    <Form onSubmit={onSubmit}>
      <FirstRow>
        <InputWithLabel
          label='First Name*'
          placeholder='First Name'
          value={formData.firstName}
          onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
        >
          <ErrorText>{error?.firstName}</ErrorText>
        </InputWithLabel>
        <InputWithLabel
          label='Last Name*'
          placeholder='Last Name'
          value={formData.lastName}
          onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
        >
          <ErrorText>{error?.lastName}</ErrorText>
        </InputWithLabel>
      </FirstRow>
      <InputWithLabel
        label='Email*'
        placeholder='you@company.com'
        type='email'
        value={formData.email}
        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
      >
        <ErrorText>{error?.email}</ErrorText>
      </InputWithLabel>
      <InputWithLabel
        label='Company Name*'
        placeholder='XYZ Company'
        value={formData.company_name}
        onChange={(e) => setFormData((prev) => ({ ...prev, company_name: e.target.value }))}
      >
        <ErrorText>{error?.company_name}</ErrorText>
      </InputWithLabel>

      <FilterContainer>
        <Filter
          options={purposeOption}
          selectedOption={formData.purpose}
          setSelectedOption={(_s) => setFormData((prev) => ({ ...prev, purpose: _s }))}
          defaultOption={purposeOption[0].value}
          label='Purpose*'
          filterlabelposition='top'
        />
        <ErrorText>{error?.purpose}</ErrorText>
      </FilterContainer>
      <InputWithLabel
        label='Phone Number (Optional)'
        placeholder='+1 (555) 000-0000'
        value={formData.phone}
        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
      >
        {console.log(error)}
        <ErrorText>{error?.phone}</ErrorText>
      </InputWithLabel>
      <TextArea
        label='Message*'
        placeholder='Leave us a message...'
        value={formData.message}
        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
      >
        <ErrorText>{error?.message}</ErrorText>
      </TextArea>

      <Checkbox>
        You agree to our friendly privacy policy.
      </Checkbox>

      <ReCAPTCHA
        ref={recaptchaRef}
        size='normal'
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={onReCAPTCHAChange}
      />

      <StyledButton
        hierarchy='primary'
        size='xl'
        disabled={error || !captchaCode}
      >
        Send Message
      </StyledButton>

    </Form>
  )
}

const Form = styled.form`
    width: 480px;
    display:flex;
    gap:24px;
    flex-direction: column;
    margin: 56px auto 96px;
`
const FirstRow = styled.div`
    display:flex;
    flex-wrap: wrap;
    gap: 32px;
    width: 100%;
`

const StyledButton = styled(Button)`
    width: 100%;
    margin-top:8px;
`
const ErrorText = styled.p`
    margin-top:6px;
    ${typography.styles.textSm}
    ${typography.weights.regular}
`
const FilterContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction: column;
`
