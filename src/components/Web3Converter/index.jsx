import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { colors, primaryColorKey } from '../../../styles/colors'
import { typography } from '../../../styles/typography'
import { utils } from '../../../styles/utils'
import { Breadcrumbs } from '../Breadcrumbs'
import { CircularCheckbox } from '../CircularCheckbox'
import { Icon } from '../Icon'

const defaultValue = {
  breadcrumbText: 'String to Bytes Converter',
  title: 'Convert String to Solidity Bytes32',
  switchButtonSlug: 'bytes32-to-string-converter',
  switchButtonFrom: 'Bytes',
  switchButtonTo: 'String',
  inputLabel: 'Enter Your String Value',
  inputPlaceholder: 'Example: foobar',
  resultPlaceholder: '0x',
  convertFrom: true,
  radioButtonSlug: 'number-to-bytes32-converter',
  showPaddingSection: false
}

const getInfoBySlug = slug => {
  let _info = {}

  switch (slug) {
    case 'string-to-bytes32':
      _info = {
        breadcrumbText: 'String to Bytes Converter',
        title: 'Convert String to Solidity Bytes32',
        switchButtonSlug: 'bytes32-to-string-converter',
        switchButtonFrom: 'Bytes',
        switchButtonTo: 'String',
        inputLabel: 'Enter Your String Value',
        inputPlaceholder: 'Example: foobar',
        resultPlaceholder: '0x',
        convertFrom: true,
        radioButtonSlug: 'number-to-bytes32-converter',
        showPaddingSection: true
      }
      break

    case 'number-to-bytes32':
      _info = {
        breadcrumbText: 'Number to Bytes Converter',
        title: 'Convert Number to Solidity Bytes32',
        switchButtonSlug: 'bytes32-to-number-converter',
        switchButtonFrom: 'Bytes',
        switchButtonTo: 'Number',
        inputLabel: 'Enter Your Number Value',
        inputPlaceholder: 'Example: 123.456',
        resultPlaceholder: '0x',
        convertFrom: true,
        radioButtonSlug: 'string-to-bytes32-converter',
        showPaddingSection: true
      }
      break

    case 'bytes32-to-string':
      _info = {
        breadcrumbText: 'Bytes to String Converter',
        title: 'Convert Solidity Bytes32 to String',
        switchButtonSlug: 'string-to-bytes32-converter',
        switchButtonFrom: 'String',
        switchButtonTo: 'Bytes',
        inputLabel: 'Enter Your Bytes Value',
        inputPlaceholder: 'Example: 0x7465737400000000000000000000000000000000000000000000000',
        resultPlaceholder: 'foobar',
        convertFrom: false,
        radioButtonSlug: 'bytes32-to-number-converter',
        showPaddingSection: false
      }
      break

    case 'bytes32-to-number':
      _info = {
        breadcrumbText: 'Bytes to Number Converter',
        title: 'Convert Solidity Bytes32 to Number',
        switchButtonSlug: 'number-to-bytes32-converter',
        switchButtonFrom: 'Number',
        switchButtonTo: 'Bytes',
        inputLabel: 'Enter Your Bytes Value',
        inputPlaceholder: 'Example: 0x7465737400000000000000000000000000000000000000000000000',
        resultPlaceholder: '123.456',
        convertFrom: false,
        radioButtonSlug: 'bytes32-to-string-converter',
        showPaddingSection: false
      }
      break

    default:
      _info = {}
      break
  }

  return _info
}

const Web3Converter = ({ slug, crumbs }) => {
  const [info, setInfo] = useState(defaultValue)
  const [radioForm, setRadioForm] = useState('string')
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')

  const router = useRouter()

  useEffect(() => {
    if (!slug) return
    const _info = getInfoBySlug(slug)
    setInfo(_info)

    const _radio = (_info.switchButtonFrom === 'Number' || _info.switchButtonTo === 'Number')
      ? 'number'
      : 'string'
    setRadioForm(_radio)
  }, [slug])

  const handleRadioChange = val => {
    setRadioForm(val)

    router.push(`/web3-tools/${info.radioButtonSlug}`)
  }

  const handleInputChange = (field, value) => {
    if (field === 'input') setInput(value)
    if (field === 'result') setResult(value)
  }

  return (
    <Container>
      <InnerContainer>
        <MobileContainer>
          <Breadcrumbs
            crumbs={[
              ...crumbs,
              { name: info.breadcrumbText, link: '#' }
            ]}
          />
          <TitleContainer>
            <Title>{info.title}</Title>
          </TitleContainer>
        </MobileContainer>

        <FlexContainer>
          <LeftContainer>
            <DesktopContainer>
              <Breadcrumbs
                crumbs={[
                  ...crumbs,
                  { name: info.breadcrumbText, link: '#' }
                ]}
              />
              <TitleContainer>
                <Title>{info.title}</Title>
                <SwitchButton href={info.switchButtonSlug}>
                  <Icon variant='switch-horizontal-02' size={20} />
                  <span>{info.switchButtonFrom} to {info.switchButtonTo}</span>
                </SwitchButton>
              </TitleContainer>
            </DesktopContainer>
            <Form>
              <div>
                <InputLabel htmlFor='input-value'>{info.inputLabel}</InputLabel>
                <InputContainer>
                  <input
                    placeholder={info.inputPlaceholder}
                    id='input-value'
                    value={input}
                    onChange={(e) => handleInputChange('input', e.target.value)}
                  />
                  <Icon variant='help-circle' size={16} />
                </InputContainer>
              </div>
              <div>
                <InputLabel htmlFor='result-value'>Result</InputLabel>
                <TextareaContainer>
                  <textarea
                    placeholder={info.resultPlaceholder}
                    id='result-value'
                    value={result}
                    onChange={(e) => handleInputChange('result', e.target.value)}
                  />
                  <CopyButton disabled>
                    <Icon variant='copy-01' size={20} />
                    <span>Copy Result</span>
                  </CopyButton>
                </TextareaContainer>
              </div>
            </Form>
          </LeftContainer>
          <RightContainer>
            <OptionsTitle>Options</OptionsTitle>
            <RadioContainer onChange={e => handleRadioChange(e.target.value)}>
              <OptionsLabel>Convert Values {info.convertFrom ? 'From' : 'To'}</OptionsLabel>
              <RadioButtons>
                <div>
                  <input
                    type='radio'
                    id='string-radio'
                    name='convert-from'
                    value='string'
                    checked={radioForm === 'string'}
                    onChange={() => {}}
                  />
                  <label htmlFor='string-radio'>String</label>
                </div>
                <div>
                  <input
                    type='radio'
                    id='number-radio'
                    name='convert-from'
                    value='number'
                    checked={radioForm === 'number'}
                    onChange={() => {}}
                  />
                  <label htmlFor='number-radio'>Number</label>
                </div>
              </RadioButtons>
            </RadioContainer>

            {
              info.showPaddingSection && (
                <PaddingContainer>
                  <div>
                    <PaddingLabel htmlFor='padding-radio'>Add Padding</PaddingLabel>
                    <PaddingInfo>
                      Add trailing zeros to fill up the entire storage space
                    </PaddingInfo>
                  </div>
                  <CircularCheckbox
                    id='padding-radio'
                    name='padding-radio'
                  >
                    Add Padding checkbox
                  </CircularCheckbox>
                </PaddingContainer>
              )
            }
          </RightContainer>

        </FlexContainer>

        <MobileContainer2>
          <SwitchButton href={info.switchButtonSlug}>
            <Icon variant='switch-horizontal-02' size={20} />
            <span>Bytes to String</span>
          </SwitchButton>
        </MobileContainer2>
      </InnerContainer>
    </Container>
  )
}

export { Web3Converter }

const Container = styled.div`
  padding: 56px 0 0 0;
  ${utils.fullWidthContainer}
`

const InnerContainer = styled.div`
  padding-left: 32px;
  padding-right: 32px;
  
  @media screen and (max-width: 768px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`

const FlexContainer = styled.div`
  display: flex;
  gap: 64px;
  align-items: flex-start;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    margin-top: 32px;
    gap: 32px;
  }
`

const MobileContainer = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`

const MobileContainer2 = styled(MobileContainer)`
  margin-top: 32px;
`

const DesktopContainer = styled.div`
  display: block;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const LeftContainer = styled.div`
  & > div > div:nth-of-type(1) {  // disabling default margin of Breadcrumb container
    margin-bottom: 0px;
  }

  width: 754px;
  
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

const TitleContainer = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`

const Title = styled.h2`
  ${typography.styles.displaySm}
  ${typography.weights.semibold}
  
  @media screen and (max-width: 768px) {
    ${typography.styles.displayXs}
  }
`

const IconButtonStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 8px;
  ${typography.styles.textSm}
  ${typography.weights.semibold}
  cursor: pointer;
  white-space: nowrap;
  
  @media screen and (max-width: 768px) {
    white-space: normal;
  }

  &:disabled {
    opacity: 50%;
    cursor: not-allowed;
    background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey][600] : colors.gray[500]};
  }
`

const SwitchButton = styled(Link)`
  ${IconButtonStyle}
  background-color: ${colors[primaryColorKey][600]};
  
  span, svg {
    color: ${colors.white}; 
  }
`

const Form = styled.form`
  margin-top: 32px;

  & > *:not(:nth-of-type(1)) {
    margin-top: 32px;
  }

  @media screen and (max-width: 768px) {
    margin-top: 0px;
  }
`

const InputLabel = styled.label`
  ${typography.styles.textSm}
  ${typography.weights.medium}
  color: ${props => props.theme.isLightMode ? colors.gray[700] : colors.gray[300]};
`

const Input = styled.div`
  border-radius: 8px;
  border: 1px solid ${props => props.theme.isLightMode ? colors.gray[300] : colors.gray[500]};
  background: ${props => props.theme.isLightMode ? 'transparent' : colors.gray[600]};
  margin-top: 6px;
  position: relative;

  input, textarea {
    outline: none;
    width: 100%;

    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: ${props => props.theme.isLightMode ? colors.gray['500'] : colors.gray['300']};
      opacity: 1; /* Firefox */
    }
  
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: ${props => props.theme.isLightMode ? colors.gray['500'] : colors.gray['300']};
    }
  
    ::-ms-input-placeholder { /* Microsoft Edge */
      color: ${props => props.theme.isLightMode ? colors.gray['500'] : colors.gray['300']};
    }
  }

`

const InputContainer = styled(Input)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;

  svg {
    color: ${props => props.theme.isLightMode ? colors.gray[400] : colors.gray[50]};
  }
`

const TextareaContainer = styled(Input)`
  padding: 12px 14px;
  height: 108px;
`

const CopyButton = styled.button`
  ${IconButtonStyle}
  position: absolute;
  bottom: 12px;
  right: 14px;
  color: ${colors.white};
  background-color: ${colors[primaryColorKey][600]};

`

const RightContainer = styled.div`
  padding: 24px;
  
  border: 1px solid ${props => props.theme.isLightMode ? colors.gray[300] : colors.gray[500]};
  border-radius: 8px;
  width: 398px;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 16px;
  }  
`

const OptionsTitle = styled.p`
  ${typography.styles.textLg}
  ${typography.weights.semibold}
`

const RadioContainer = styled.fieldset`
  margin-top: 16px;
`

const OptionsLabel = styled.legend`
  ${typography.styles.textSm}
  ${typography.weights.medium}
  color: ${props => props.theme.isLightMode ? colors.gray[700] : colors.gray[25]};
`

const RadioButtons = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  ${typography.styles.textSm}
  ${typography.weights.medium}
  color: ${props => props.theme.isLightMode ? colors.gray[700] : colors.white};

  div {
    display: flex;
    align-items: center;
  }

  input[type="radio"] {
    width: 16px;
    height: 16px;

    accent-color: ${props => props.theme.isLightMode ? colors[primaryColorKey][600] : colors[primaryColorKey][600]};
  }

  input, label {
    cursor: pointer;
  }

  label {
    margin-left: 8px;
  }
`

const PaddingContainer = styled.div`
  margin-top: 24px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 4px;
  background-color: ${props => props.theme.isLightMode ? colors.gray[50] : colors.gray[600]};
  border: 2px solid ${props => props.theme.isLightMode ? colors.gray[400] : colors.gray[500]};
  border-radius: 12px;

  input[type="radio"] {
    width: 16px;
    height: 16px;
  }

  label {
    ${utils.srOnly}
  }
`

const PaddingLabel = styled.p`
  ${typography.styles.textSm}
  ${typography.weights.medium}
  color: ${props => props.theme.isLightMode ? colors.gray[700] : colors.white};
`

const PaddingInfo = styled.p`
  ${typography.styles.textSm}
  ${typography.weights.regular}
  color: ${props => props.theme.isLightMode ? colors.gray[600] : colors.gray[25]};
`
