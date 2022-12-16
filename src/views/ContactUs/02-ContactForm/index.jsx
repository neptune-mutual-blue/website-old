import { useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import styled from 'styled-components'
import { Button } from '../../../components/Button'
import { Checkbox } from '../../../components/Checkbox'
import { InputWithLabel } from '../../../components/InputWithLabel'
import { TextArea } from '../../../components/TextArea'
import { FormOptions } from './FormOptions'
import { FormSelector } from './FormSelector'
import { validateForm } from './validateForm'

export const purposeOptions = [
  { text: 'Select a purpose', value: '' },
  { text: 'Provide Liquidity', value: 'providing-liquidity', iconVariant: 'chart-breakout-square' },
  { text: 'Purchasing Policy', value: 'purchasing-policy', iconVariant: 'shield-tick' },
  { text: 'Creating Cover', value: 'creating-cover', iconVariant: 'folder-plus' },
  { text: 'Press Reachout', value: 'creating-cover', iconVariant: 'message-dots-circle' },
  { text: 'Other', value: 'other', iconVariant: 'edit-03' }
]

export const contactMethodOptions = [
  { text: 'Select a contact method', value: '' },
  { text: 'Email', value: 'email', iconVariant: 'mail-02' },
  { text: 'Telegram', value: 'telegram', iconVariant: 'telegram' },
  { text: 'Phone/Whatsapp', value: 'phone-whatsapp', iconVariant: 'phone-01' },
  { text: 'Other', value: 'other', iconVariant: 'edit-03' }
]

export const roleOptions = [
  { text: 'Select a role', value: '' },
  { text: 'Business Development', value: 'business-development', iconVariant: 'lightbulb-03' },
  { text: 'Sale', value: 'sale', iconVariant: 'line-chart-up-03' },
  { text: 'Blockchain Developer', value: 'blockchain-developer', iconVariant: 'code-square-one' },
  { text: 'Co-founder/CXO', value: 'co-founder-cxo', iconVariant: 'user-square' },
  { text: 'Engineering', value: 'engineering', iconVariant: 'cube-01' },
  { text: 'Operations', value: 'operations', iconVariant: 'dots-grid' },
  { text: 'Product Manager', value: 'product-manager', iconVariant: 'heart-hand' }
]

export const blockchainOptions = [
  { text: 'Ethereum', value: 'ethereum', iconVariant: 'ethereum', iconVariantDark: 'ethereum-dark' },
  { text: 'Arbitrum', value: 'arbitrum', iconVariant: 'arbitrum', iconVariantDark: 'arbitrum-dark' },
  { text: 'BNB Chain', value: 'bnbchain', iconVariant: 'bnbchain', iconVariantDark: 'bnbchain-dark' },
  { text: 'Avalanche', value: 'avalanche', iconVariant: 'avalanche', iconVariantDark: 'avalanche-dark' },
  { text: 'Polygon', value: 'polygon', iconVariant: 'polygon', iconVariantDark: 'polygon-dark' },
  { text: 'Other', value: 'other', iconVariant: 'pencil-line' }
]

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  company_name: '',
  website: '',
  purpose: purposeOptions[0],
  contactMethod: contactMethodOptions[0],
  contactMethodName: '',
  contactAddress: '',
  role: roleOptions[0],
  blockchain: blockchainOptions[0],
  phone: '',
  message: ''
}
export const ContactForm = () => {
  const [formData, setFormData] = useState(initialState)

  const [error, setError] = useState()

  const [captchaCode, setCaptchaCode] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [submitClicked, setSubmitClicked] = useState(false)

  const recaptchaRef = useRef()

  const makeRequest = async (data, cb = () => {}) => {
    const API_URL = 'https://api.neptunemutual.net/contact'
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(data)
      })
      console.log({ res })
      cb()
    } catch (err) {
      console.log({ err })
    }
  }

  const onSubmit = (e) => {
    setSubmitClicked(true)
    e.preventDefault()
    const validated = validateForm(formData, setError)
    if (validated && captchaCode && acceptTerms) {
      const _data = formData

      _data.contactMethod = formData.contactMethod.value
      _data.purpose = formData.purpose.value
      _data.role = formData.role.value

      makeRequest(formData, () => {
        setSubmitClicked(false)
        setFormData(initialState)
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

  const handleBlockchainChange = _options => {
    setFormData(prev => ({
      ...prev,
      blockchain: _options.map(_option => {
        const _val = _option.textValue ?? _option.text
        if (_val) return _val
        return false
      }).filter(val => !!val)
    }))
  }

  useEffect(() => {
    if (submitClicked) validateForm(formData, setError)
  }, [formData, submitClicked])

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
          />
        </WrappedInput>

        <WrappedInput>
          <InputWithLabel
            label='Last Name*'
            placeholder='Last Name'
            value={formData.lastName}
            onChange={(e) => handleNameChange('lastName', e.target.value)}
            error={error?.lastName}
          />
        </WrappedInput>
      </FirstRow>

      <InputWithLabel
        label='Email*'
        placeholder='you@company.com'
        type='email'
        value={formData.email}
        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
        error={error?.email}
      />

      <InputWithLabel
        label='What is the name of your business or project?*'
        placeholder='XYZ Company'
        value={formData.company_name}
        onChange={(e) => setFormData((prev) => ({ ...prev, company_name: e.target.value }))}
        error={error?.company_name}
      />

      <FilterContainer>
        <FormSelector
          options={blockchainOptions}
          label='Blockchain*'
          error={error?.blockchain}
          placeholder='Choose relevant blockchains from the list'
          onChange={handleBlockchainChange}
        />
      </FilterContainer>

      <InputWithLabel
        label='What is the website for your business or project?*'
        placeholder='https://example.com'
        value={formData.website}
        onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
        error={error?.website}
      />

      <FilterContainer>
        <FormOptions
          options={purposeOptions}
          selectedOption={formData.purpose}
          setSelectedOption={(_s) => setFormData((prev) => ({ ...prev, purpose: _s }))}
          defaultOption={purposeOptions[0]}
          label='Please select a purpose of this contact request*'
          error={error?.purpose}
        />
      </FilterContainer>

      <FilterContainer>
        <FormOptions
          options={contactMethodOptions}
          selectedOption={formData.contactMethod}
          setSelectedOption={(_s) => setFormData((prev) => ({ ...prev, contactMethod: _s }))}
          defaultOption={contactMethodOptions[0]}
          filterlabelposition='top'
          label='What’s the best way to get in touch with you?*'
          error={error?.contactMethod}
        />

        {
          formData.contactMethod.value === 'other' && (
            <SubInputs>
              <InputWithLabel
                placeholder='1. What contact method are you using?'
                value={formData.contactMethodName}
                onChange={(e) => setFormData((prev) => ({ ...prev, contactMethodName: e.target.value }))}
                error={error?.contactMethodName}
              />

              <InputWithLabel
                placeholder='2. Enter your contact number/address'
                value={formData.contactAddress}
                onChange={(e) => setFormData((prev) => ({ ...prev, contactAddress: e.target.value }))}
                error={error?.contactAddress}
              />
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
          label='What role best describes you?*'
          error={error?.role}
        />
      </FilterContainer>

      <TextArea
        label='Message*'
        placeholder='Leave us a message...'
        value={formData.message}
        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
        error={error?.message}
        rows={13}
      />

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
        // disabled={error || !captchaCode || !acceptTerms}
        disabled={!captchaCode || !acceptTerms}
      >
        Send Message
      </StyledButton>
    </Form>
  )
}

const Form = styled.form`
  max-width: 680px;
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

const FilterContainer = styled.div`
  width:100%;
`

const SubInputs = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`
