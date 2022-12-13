import { useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import styled from 'styled-components'
import { colors } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { Button } from '../../../components/Button'
import { Checkbox } from '../../../components/Checkbox'
import { InputWithLabel } from '../../../components/InputWithLabel'
import { TextArea } from '../../../components/TextArea'
import { FormOptions } from './FormOptions'
import { validateForm } from './validateForm'

export const purposeOptions = [
  { text: 'Select a purpose', value: '' },
  { text: 'Provide Liquidity', value: 'provide-liquidity', iconVariant: 'provide-liquidity' }
]

export const contactMethodOptions = [
  { text: 'Select a contact method', value: '' },
  { text: 'Other', value: 'other', iconVariant: 'pencil-line' }
]

export const roleOptions = [
  { text: 'Select a role', value: '' },
  { text: 'Engineering', value: 'engineering', iconVariant: 'cube-01' }
]

export const blockchainOptions = [
  { text: 'Select a blockchain', value: '' },
  { text: 'Avalanche', value: 'avalanche', iconVariant: 'avalanche' }
]

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company_name: '',
    website: '',
    purpose: purposeOptions[0],
    contactMethod: contactMethodOptions[0],
    role: roleOptions[0],
    blockchain: blockchainOptions[0],
    phone: '',
    message: ''
  })

  const [error, setError] = useState()

  const [captchaCode, setCaptchaCode] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)

  const recaptchaRef = useRef()

  const onSubmit = (e) => {
    e.preventDefault()
    const validated = validateForm(formData, setError, purposeOptions)
    if (validated && captchaCode && acceptTerms) {
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

  const onReCAPTCHAChange = (captchaCode) => {
    if (!captchaCode) {
      return
    }
    setCaptchaCode(captchaCode)
  }

  const handleChange = () => {
    setAcceptTerms((prev) => !prev)
  }

  const handleNameChange = (field, value) => {
    if (value === '') {
      return setFormData((prev) => ({ ...prev, [field]: value }))
    }
    if (/^[a-zA-Z]+$/.test(value)) {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handlePhoneNumberChange = (field, value) => {
    if (value === '') {
      return setFormData((prev) => ({ ...prev, [field]: value }))
    }
    if (value && /^[\d ()+]+$/.test(value)) {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  useEffect(() => {
    validateForm(formData, setError)
  }, [formData])

  return (
    <Form onSubmit={onSubmit}>
      <FirstRow>
        <WrappedInput>
          <InputWithLabel
            label='First Name*'
            placeholder='First Name'
            value={formData.firstName}
            onChange={(e) => handleNameChange('firstName', e.target.value)}
            error={error?.firstName}
          >
            <ErrorText>{error?.firstName}</ErrorText>
          </InputWithLabel>
        </WrappedInput>

        <WrappedInput>
          <InputWithLabel
            label='Last Name*'
            placeholder='Last Name'
            value={formData.lastName}
            onChange={(e) => handleNameChange('lastName', e.target.value)}
            error={error?.lastName}
          >
            <ErrorText>{error?.lastName}</ErrorText>
          </InputWithLabel>
        </WrappedInput>
      </FirstRow>

      <InputWithLabel
        label='Email*'
        placeholder='you@company.com'
        type='email'
        value={formData.email}
        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
        error={error?.email}
      >
        <ErrorText>{error?.email}</ErrorText>
      </InputWithLabel>

      <InputWithLabel
        label='Company Name*'
        placeholder='XYZ Company'
        value={formData.company_name}
        onChange={(e) => setFormData((prev) => ({ ...prev, company_name: e.target.value }))}
        error={error?.company_name}
      >
        <ErrorText>{error?.company_name}</ErrorText>
      </InputWithLabel>

      <InputWithLabel
        label='Website*'
        placeholder='https://'
        value={formData.website}
        onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
        error={error?.website}
      >
        <ErrorText>{error?.website}</ErrorText>
      </InputWithLabel>

      <FilterContainer>
        <FormOptions
          options={purposeOptions}
          selectedOption={formData.purpose}
          setSelectedOption={(_s) => setFormData((prev) => ({ ...prev, purpose: _s }))}
          defaultOption={purposeOptions[0]}
          filterlabelposition='top'
          label='Purpose'
          error={error?.purpose}
        />
        <ErrorText>{error?.purpose}</ErrorText>
      </FilterContainer>

      <FilterContainer>
        <FormOptions
          options={contactMethodOptions}
          selectedOption={formData.contactMethod}
          setSelectedOption={(_s) => setFormData((prev) => ({ ...prev, contactMethod: _s }))}
          defaultOption={contactMethodOptions[0]}
          filterlabelposition='top'
          label='Contact Method*'
          error={error?.contactMethod}
        />
        <ErrorText>{error?.contactMethod}</ErrorText>

        {
          formData.contactMethod.value === 'other' && (
            <SubInputs>
              <InputWithLabel
                placeholder='1. What contact method are you using?'
                value={formData.contactMethodName}
                onChange={(e) => setFormData((prev) => ({ ...prev, contactMethodName: e.target.value }))}
                error={error?.contactMethodName}
              >
                <ErrorText>{error?.contactMethodName}</ErrorText>
              </InputWithLabel>

              <InputWithLabel
                placeholder='2. Enter your contact number/address'
                value={formData.contactAddress}
                onChange={(e) => setFormData((prev) => ({ ...prev, contactAddress: e.target.value }))}
                error={error?.contactAddress}
              >
                <ErrorText>{error?.contactAddress}</ErrorText>
              </InputWithLabel>
            </SubInputs>
          )
        }
      </FilterContainer>

      <FilterContainer>
        <FormOptions
          options={roleOptions}
          selectedOption={formData.role}
          setSelectedOption={(_s) => setFormData((prev) => ({ ...prev, role: _s }))}
          defaultOption={roleOptions[0]}
          filterlabelposition='top'
          label='Role*'
          error={error?.role}
        />
        <ErrorText>{error?.role}</ErrorText>
      </FilterContainer>

      <FilterContainer>
        <FormOptions
          options={blockchainOptions}
          selectedOption={formData.blockchain}
          setSelectedOption={(_s) => setFormData((prev) => ({ ...prev, blockchain: _s }))}
          defaultOption={blockchainOptions[0]}
          filterlabelposition='top'
          label='Blockchain*'
          error={error?.blockchain}
        />
        <ErrorText>{error?.blockchain}</ErrorText>
      </FilterContainer>

      <InputWithLabel
        label='Phone Number (Optional)'
        placeholder='+1 (555) 000-0000'
        value={formData.phone}
        onChange={(e) => handlePhoneNumberChange('phone', e.target.value)}
        error={error?.phone}
      >
        <ErrorText>{error?.phone}</ErrorText>
      </InputWithLabel>

      <TextArea
        label='Message*'
        placeholder='Leave us a message...'
        value={formData.message}
        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
        error={error?.message}
      >
        <ErrorText>{error?.message}</ErrorText>
      </TextArea>

      <Checkbox
        checked={acceptTerms}
        onChange={handleChange}
      >
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
        disabled={error || !captchaCode || !acceptTerms}
      >
        Send Message
      </StyledButton>
    </Form>
  )
}

const Form = styled.form`
  max-width: 480px;
  width:100%;
  display:flex;
  gap:24px;
  flex-direction: column;
  margin: 56px auto 96px;

  @media (max-width: 768px){
    padding: 0 16px;
    margin: 40px auto 64px;
  }
`
const FirstRow = styled.div`
  display:flex;
  gap: 32px;
  width: 100%;
  @media (max-width: 768px){
    flex-wrap:wrap;
  }
`

const WrappedInput = styled.div`
  width: 100%;
`

const StyledButton = styled(Button)`
  width: 100%;
  margin-top:8px;

  :disabled {
    opacity: 0.75;
  }
`
const ErrorText = styled.p`
  margin-top:6px;
  ${typography.styles.textSm}
  ${typography.weights.regular}

  color: ${props => props.theme.isLightMode ? colors.error[600] : colors.error[800]};
`

const FilterContainer = styled.div`
  width:100%;
`

const SubInputs = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`
