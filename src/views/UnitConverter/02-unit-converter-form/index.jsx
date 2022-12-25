import { useState } from 'react'
import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../styles/colors'
import { shadows } from '../../../../styles/shadows'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { Breadcrumbs } from '../../../components/Breadcrumbs'

const initialValue = {
  wei: '',
  kWei: '',
  mWei: '',
  gWei: '',
  szabo: '',
  finney: '',
  ether: '',
  kEther: '',
  mEther: '',
  gEther: '',
  tEther: '',
  radio: 'simple'
}
const UnitConverterForm = ({ crumbs }) => {
  const [formData, setFormData] = useState(initialValue)

  const handleRadioChange = val => {
    setFormData(_prev => ({ ..._prev, radio: val }))

    // router.push(`/web3-tools/${info.radioButtonSlug}`, undefined, { scroll: false })
  }

  const handleInputChange = (field, value) => {
    setFormData(_prev => ({ ..._prev, [field]: value }))
  }

  return (
    <Container>
      <InnerContainer>
        <MobileContainer>
          <Breadcrumbs
            crumbs={[
              ...crumbs,
              { name: 'Ethereum Unit Converter', link: '#' }
            ]}
          />
          <TitleContainer>
            <Title>Convert Ethereum Denominations</Title>
          </TitleContainer>
        </MobileContainer>

        <FlexContainer>
          <LeftContainer>
            <DesktopContainer>
              <Breadcrumbs
                crumbs={[
                  ...crumbs,
                  { name: 'Ethereum Unit Converter', link: '#' }
                ]}
              />
              <TitleContainer>
                <Title>Convert Ethereum Denominations</Title>
              </TitleContainer>
            </DesktopContainer>
            <Form>
              <div>
                <InputLabel htmlFor='wei-input'>Enter Wei Value</InputLabel>
                <StyledInput
                  placeholder='Wei (10-¹⁸)'
                  id='wei-input'
                  value={formData.wei}
                  onChange={(e) => handleInputChange('wei', e.target.value)}
                />
              </div>

              {
                formData.radio === 'extended' && (
                  <>
                    <div>
                      <InputLabel htmlFor='kWei-input'>Enter KWei / Babbage / Femtoether Value</InputLabel>
                      <StyledInput
                        placeholder='KWei / Babbage / Femtoether (10-¹⁵)'
                        id='kWei-input'
                        value={formData.kWei}
                        onChange={(e) => handleInputChange('kWei', e.target.value)}
                      />
                    </div>

                    <div>
                      <InputLabel htmlFor='mWei-input'>Enter MWei / Lovelace / Picoether Value</InputLabel>
                      <StyledInput
                        placeholder='MWei / Lovelace / Picoether (10-¹²)'
                        id='mWei-input'
                        value={formData.mWei}
                        onChange={(e) => handleInputChange('mWei', e.target.value)}
                      />
                    </div>
                  </>
                )
              }

              <div>
                <InputLabel htmlFor='gwei-input'>
                  {
                    formData.radio === 'simple'
                      ? 'Enter Gwei Value'
                      : 'Enter GWei / Shannon / Nanoether / Nano Value'
                  }
                </InputLabel>
                <StyledInput
                  placeholder={
                      formData.radio === 'simple'
                        ? 'GWei (10-⁹)'
                        : 'Enter GWei / Shannon / Nanoether / Nano Value'
                    }
                  id='gwei-input'
                  value={formData.gWei}
                  onChange={(e) => handleInputChange('gWei', e.target.value)}
                />
              </div>

              {
                formData.radio === 'extended' && (
                  <>
                    <div>
                      <InputLabel htmlFor='szabo-input'>Enter Szabo / Microether/ Micro Value</InputLabel>
                      <StyledInput
                        placeholder='Szabo / Microether/ Micro (10-⁶)'
                        id='szabo-input'
                        value={formData.szabo}
                        onChange={(e) => handleInputChange('szabo', e.target.value)}
                      />
                    </div>

                    <div>
                      <InputLabel htmlFor='finney-input'>Enter Finney / Milliether / Milli Value</InputLabel>
                      <StyledInput
                        placeholder='Finney / Milliether / Milli (10-³)'
                        id='finney-input'
                        value={formData.finney}
                        onChange={(e) => handleInputChange('finney', e.target.value)}
                      />
                    </div>
                  </>
                )
              }

              <div>
                <InputLabel htmlFor='ether-input'>Enter Ether Value</InputLabel>
                <StyledInput
                  placeholder='Ether (1)'
                  id='ether-input'
                  value={formData.ether}
                  onChange={(e) => handleInputChange('ether', e.target.value)}
                />
              </div>

              {
                formData.radio === 'extended' && (
                  <>
                    <div>
                      <InputLabel htmlFor='kEther-input'>Enter KEther / Grand Value</InputLabel>
                      <StyledInput
                        placeholder='KEther / Grand (10³)'
                        id='kEther-input'
                        value={formData.kEther}
                        onChange={(e) => handleInputChange('kEther', e.target.value)}
                      />
                    </div>

                    <div>
                      <InputLabel htmlFor='mEther-input'>Enter MEther Value</InputLabel>
                      <StyledInput
                        placeholder='MEther (10⁶)'
                        id='mEther-input'
                        value={formData.mEther}
                        onChange={(e) => handleInputChange('mEther', e.target.value)}
                      />
                    </div>

                    <div>
                      <InputLabel htmlFor='gEther-input'>Enter GEther Value</InputLabel>
                      <StyledInput
                        placeholder='GEther (10⁹)'
                        id='gEther-input'
                        value={formData.gEther}
                        onChange={(e) => handleInputChange('gEther', e.target.value)}
                      />
                    </div>

                    <div>
                      <InputLabel htmlFor='tEther-input'>Enter TEther Value</InputLabel>
                      <StyledInput
                        placeholder='TEther (10¹²)'
                        id='tEther-input'
                        value={formData.tEther}
                        onChange={(e) => handleInputChange('tEther', e.target.value)}
                      />
                    </div>
                  </>
                )
              }

            </Form>
          </LeftContainer>
          <RightContainer>
            <RadioContainer onChange={e => handleRadioChange(e.target.value)}>
              <OptionsLabel>Options</OptionsLabel>
              <RadioButtons>
                <div>
                  <input
                    type='radio'
                    id='simple-radio'
                    name='options-radio'
                    value='simple'
                    checked={formData.radio === 'simple'}
                    onChange={() => {}}
                  />
                  <label htmlFor='simple-radio'>Simple Converter</label>
                </div>

                <div>
                  <input
                    type='radio'
                    id='extended-radio'
                    name='options-radio'
                    value='extended'
                    checked={formData.radio === 'extended'}
                    onChange={() => {}}
                  />
                  <label htmlFor='extended-radio'>Extended Converter</label>
                </div>
              </RadioButtons>
            </RadioContainer>
          </RightContainer>

        </FlexContainer>
      </InnerContainer>
    </Container>
  )
}

export { UnitConverterForm }

const Container = styled.div`
  padding: 56px 0 0 0;
  ${utils.fullWidthContainer}
`

const InnerContainer = styled.div``

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

const Input = styled.input`
  border-radius: 8px;
  border: 1px solid ${props => props.theme.isLightMode ? colors.gray[300] : colors.gray[500]};
  background: ${props => props.theme.isLightMode ? 'transparent' : colors.gray[600]};
  margin-top: 6px;
  position: relative;
  ${typography.styles.textMd}
  ${typography.weights.regular}

  &:is(:focus,:active,:focus-visible) {
    box-shadow: ${shadows.xs},
        0px 0px 0px 4px ${(props) => props.theme.isLightMode ? colors[primaryColorKey]['100'] : colors[primaryColorKey]['800']};
  }

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
`

const StyledInput = styled(Input)`
  display: block;
  padding: 10px 14px;
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

const RadioContainer = styled.fieldset``

const OptionsLabel = styled.legend`
  ${typography.styles.textLg}
  ${typography.weights.semibold}
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
