import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import styled from 'styled-components'
import { typography } from '../../../../styles/typography'
import { Button } from '../../../components/Button'
import { InputWithLabel } from '../../../components/InputWithLabel'
import { TextArea } from '../../../components/TextArea'

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company_name: '',
    phone: '',
    message: ''
  })

  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company_name: '',
    message: ''
  })
  const recaptchaRef = useRef()

  //   useEffect(() => {
  //     if (formData.firstName === '') {
  //       setError((prev) => ({
  //         ...prev,
  //         firstName: 'This is required.'
  //       }))
  //     } else {
  //       setError((prev) => ({
  //         ...prev,
  //         firstName: ''
  //       }))
  //     }
  //     if (formData.lastName === '') {
  //       setError((prev) => ({
  //         ...prev,
  //         lastName: 'This is required.'
  //       }))
  //     } else {
  //       setError((prev) => ({
  //         ...prev,
  //         lastName: ''
  //       }))
  //     }
  //     if (formData.email === '') {
  //       setError((prev) => ({
  //         ...prev,
  //         email: 'This is required.'
  //       }))
  //     }
  //     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
  //       setError((prev) => ({
  //         ...prev,
  //         email: 'Please enter correct email'
  //       }))
  //     }
  //     if (formData.company_name === '') {
  //       setError((prev) => ({
  //         ...prev,
  //         company_name: 'This is required.'
  //       }))
  //     } else {
  //       setError((prev) => ({
  //         ...prev,
  //         company_name: ''
  //       }))
  //     }
  //     if (formData.message === '') {
  //       setError((prev) => ({
  //         ...prev,
  //         message: 'This is required.'
  //       }))
  //     } else {
  //       setError((prev) => ({
  //         ...prev,
  //         message: ''
  //       }))
  //     }
  //   }, [formData])

  const onSubmit = (e) => {
    e.preventDefault()
  }

  const onReCAPTCHAChange = (captchaCode) => {
    if (!captchaCode) {
      return
    }

    alert(`Hey, ${formData?.email}`)
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
          <ErrorText>{error.firstName}</ErrorText>
        </InputWithLabel>
        <InputWithLabel
          label='Last Name*'
          placeholder='Last Name'
          value={formData.lastName}
          onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
        >
          <ErrorText>{error.lastName}</ErrorText>
        </InputWithLabel>
      </FirstRow>
      <InputWithLabel
        label='Email*'
        placeholder='you@company.com'
        type='email'
        value={formData.email}
        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
      >
        <ErrorText>{error.email}</ErrorText>
      </InputWithLabel>
      <InputWithLabel
        label='Company Name*'
        placeholder='XYZ Company'
        value={formData.company_name}
        onChange={(e) => setFormData((prev) => ({ ...prev, company_name: e.target.value }))}
      >
        <ErrorText>{error.company_name}</ErrorText>
      </InputWithLabel>
      <InputWithLabel
        label='Purpose*'
        placeholder='Select Purpose'
      />
      <InputWithLabel
        label='Phone Number (Optional)'
        placeholder='+1 (555) 000-0000'
        value={formData.phone}
        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
      />
      <TextArea
        label='Message*'
        placeholder='Leave us a message...'
        value={formData.message}
        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
      >
        <ErrorText>{error.message}</ErrorText>
      </TextArea>

      <ReCAPTCHA
        ref={recaptchaRef}
        size='normal'
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={onReCAPTCHAChange}
      />

      <StyledButton
        hierarchy='primary'
        size='xl'
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
    justify-content:center;
    align-items: center;
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
