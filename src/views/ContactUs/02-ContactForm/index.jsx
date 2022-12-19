import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import styled from 'styled-components'
import { colors } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { Button } from '../../../components/Button'
import { Checkbox } from '../../../components/Checkbox'
import { Icon } from '../../../components/Icon'
import { InputWithLabel } from '../../../components/InputWithLabel'
import { TextArea } from '../../../components/TextArea'
import { FormOptions } from './FormOptions'
import { FormSelector } from './FormSelector'
import { validateForm } from './validateForm'

export const purposeOptions = [
  { text: 'Choose your reason for contacting us', value: '' },
  { text: 'Provide Liquidity', value: 'providing-liquidity', iconVariant: 'chart-breakout-square' },
  { text: 'Purchasing Policy', value: 'purchasing-policy', iconVariant: 'shield-tick' },
  { text: 'Creating Cover', value: 'creating-cover', iconVariant: 'folder-plus' },
  { text: 'Press Reachout', value: 'creating-cover', iconVariant: 'message-dots-circle' },
  { text: 'Other', value: 'other', iconVariant: 'edit-03' }
]

export const contactMethodOptions = [
  { text: 'Tell us how we should respond to you', value: '' },
  { text: 'Email', value: 'email', iconVariant: 'mail-02' },
  { text: 'Telegram', value: 'telegram', iconVariant: 'telegram' },
  { text: 'Phone/Whatsapp', value: 'phone', iconVariant: 'phone-01' },
  { text: 'Other', value: 'other', iconVariant: 'edit-03' }
]

export const roleOptions = [
  { text: 'Choose the most relevant role', value: '' },
  { text: 'Business Development', value: 'business-development', iconVariant: 'lightbulb-03' },
  { text: 'Sale', value: 'sale', iconVariant: 'line-chart-up-03' },
  { text: 'Blockchain Developer', value: 'blockchain-developer', iconVariant: 'code-square-one' },
  { text: 'Co-founder/CXO', value: 'co-founder-cxo', iconVariant: 'user-square' },
  { text: 'Engineering', value: 'engineering', iconVariant: 'cube-01' },
  { text: 'Operations', value: 'operations', iconVariant: 'dots-grid' },
  { text: 'Product Manager', value: 'product-manager', iconVariant: 'heart-hand' },
  { text: 'Other', value: 'other', iconVariant: 'pencil-line' }
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
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const [resetBlockchains, setResetBlockchains] = useState(0)

  const recaptchaRef = useRef()
  const itemsRef = useRef([])

  const makeRequest = async (data, cb = () => {}) => {
    const API_URL = process.env.NEXT_PUBLIC_FORM_API

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(data)
      })

      if (res.ok) {
        cb()
      }
    } catch (err) {
      console.log({ err })
    }
  }

  const prepareData = (_formData, _captcha) => {
    const _data = {}

    _data.firstname = _formData.firstName
    _data.lastname = _formData.lastName
    _data.email = _formData.email
    _data.company = _formData.company_name
    _data.website = _formData.website
    _data.purpose = _formData.purpose.text
    _data.contactMethod = _formData.contactMethod.text
    _data.role = _formData.role.text
    _data.blockchains = _formData.blockchain
    _data.message = _formData.message
    _data.captcha = _captcha

    return _data
  }

  const onSubmit = () => {
    setSubmitClicked(true)

    const { validated, firstErrorKey } = validateForm(formData, setError)

    if (!validated && firstErrorKey) {
      itemsRef.current?.[firstErrorKey]?.focus()
    }

    if (validated && captchaCode && acceptTerms) {
      const _data = prepareData(formData, captchaCode)

      makeRequest(_data, () => {
        setSubmitSuccess(true)
        setFormData(initialState)
        setSubmitClicked(false)

        setResetBlockchains(val => val + 1)
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

  const handlePhoneChange = (field, value) => {
    if (value === '') {
      return setFormData((prev) => ({ ...prev, [field]: value }))
    }
    if (/^\+?\d*$/.test(value)) {
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
    <Form
      onSubmit={e => e.preventDefault()}
    >
      <FirstRow>
        <WrappedInput>
          <InputWithLabel
            label='First Name*'
            placeholder='John'
            value={formData.firstName}
            onChange={(e) => handleNameChange('firstName', e.target.value)}
            error={error?.firstName}
            id='firstName'
            ref={el => {
              itemsRef.current.firstName = el
            }}
          />
        </WrappedInput>

        <WrappedInput>
          <InputWithLabel
            label='Last Name*'
            placeholder='Doe'
            value={formData.lastName}
            onChange={(e) => handleNameChange('lastName', e.target.value)}
            error={error?.lastName}
            id='lastName'
            ref={el => {
              itemsRef.current.lastName = el
            }}
          />
        </WrappedInput>
      </FirstRow>

      <InputWithLabel
        label='Email*'
        placeholder='john@example.com'
        type='email'
        value={formData.email}
        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
        error={error?.email}
        id='email'
        ref={el => {
          itemsRef.current.email = el
        }}
      />

      <InputWithLabel
        label='What is the name of your business or project?*'
        placeholder='Example Inc.'
        value={formData.company_name}
        onChange={(e) => setFormData((prev) => ({ ...prev, company_name: e.target.value }))}
        error={error?.company_name}
        id='company_name'
        ref={el => {
          itemsRef.current.company_name = el
        }}
      />

      <FilterContainer>
        <FormSelector
          options={blockchainOptions}
          label='What blockchains are you currently building on?*'
          error={error?.blockchain}
          placeholder='Choose relevant blockchains from the list'
          onChange={handleBlockchainChange}
          id='blockchain'
          ref={el => {
            itemsRef.current.blockchain = el
          }}
          reset={resetBlockchains}
        />
      </FilterContainer>

      <InputWithLabel
        label='What is the website of your business or project?*'
        placeholder='https://example.com'
        value={formData.website}
        onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
        error={error?.website}
        id='website'
        ref={el => {
          itemsRef.current.website = el
        }}
      />

      <FilterContainer>
        <FormOptions
          options={purposeOptions}
          selectedOption={formData.purpose}
          setSelectedOption={(_s) => setFormData((prev) => ({ ...prev, purpose: _s }))}
          defaultOption={purposeOptions[0]}
          label='Please select a purpose of this contact request*'
          error={error?.purpose}
          id='purpose'
          ref={el => {
            itemsRef.current.purpose = el
          }}
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
          id='contactMethod'
          ref={el => {
            itemsRef.current.contactMethod = el
          }}
        />

        {
          ['telegram', 'phone'].includes(formData.contactMethod.value) && (
            <SubInputs>
              <InputWithLabel
                placeholder='Enter your Whatsapp/Telegram Id'
                value={formData.phone}
                onChange={(e) => handlePhoneChange('phone', e.target.value)}
                error={error?.phone}
                id='phone'
                ref={el => {
                  itemsRef.current.phone = el
                }}
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
          id='role'
          ref={el => {
            itemsRef.current.role = el
          }}
        />
      </FilterContainer>

      <TextArea
        label='Message*'
        placeholder='Kindly write your message'
        value={formData.message}
        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
        error={error?.message}
        rows={13}
        id='message'
        ref={el => {
          itemsRef.current.message = el
        }}
      />

      <Checkbox
        checked={acceptTerms}
        onChange={handleChange}
      >
        I accept the Neptune Mutual <Link href='/policies/privacy-policy'>privacy policy</Link>
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
        onClick={onSubmit}
        // disabled={error || !captchaCode || !acceptTerms}
      >
        <span>Send Message</span>
        <Icon variant='send-03' size={24} />
      </StyledButton>

      {
          submitSuccess && (
            <SuccessMessage>
              <Icon variant='check-circle-broken' size={20} />
              Thank you for contacting us. We have received your message.
            </SuccessMessage>
          )
       }
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
    gap: 24px;
    flex-wrap:wrap;
  }
`

const WrappedInput = styled.div`
  width: 100%;
`

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 8px;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
  
  :disabled {
    opacity: 0.75;
  }
  
  @media (max-width: 768px){
    margin-top: 16px;
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

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  ${typography.styles.textMd}
  ${typography.weights.regular}
  color: ${colors.success[600]};
  gap: 12px;
`
