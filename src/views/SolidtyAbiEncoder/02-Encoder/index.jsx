import styled from 'styled-components'
import { utils } from '../../../../styles/utils'
import { colors, primaryColorKey } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { Button } from '../../../components/Button'
import { shadows } from '../../../../styles/shadows'
import { Input } from '../../../components/Input'
import { InputHint } from '../../../components/Input/Hint'
import { useRef, useState, useEffect } from 'react'
import { isJSON } from '../../../helpers'

// function
// https://github.com/neptune-mutual-blue/protocol/tree/develop/abis
// Encode
// Everythiing function

// Read Contract
// view and pure

// Write
// Everythiing else
const STORAGE_KEY = 'abis'

const Encoder = () => {
  const formRef = useRef()
  // const [selectedStorageKey, setSelectedStorageKey] = useState()
  const [contracts, setContracts] = useState([])
  const [abiInvalidFormat, setAbiInvalidFormat] = useState(false)
  const [isSaveable, setIsSaveable] = useState(false)
  const [restorationFailed, setRestorationFailed] = useState(false)

  useEffect(() => {
    const storageData = window.localStorage.getItem(STORAGE_KEY)
    if (isJSON(storageData)) {
      setContracts(JSON.parse(storageData) || [])
    } else {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const restoreSpecificContract = (key) => {
    const { abi, contract_name: contractName, address } = contracts[key]
    const form = formRef.current
    form.abi.value = abi
    form.contract_name.value = contractName
    form.address.value = address
    setIsSaveable(true)
  }

  const saveToStorage = (e) => {
    e.preventDefault()
    let abis = []
    const form = formRef.current

    const isAbiJson = isJSON(form.abi.value)

    if (!isAbiJson) {
      return true
    }

    const storageData = window.localStorage.getItem(STORAGE_KEY)

    if (isJSON(storageData)) {
      abis = JSON.parse(storageData) || []
    } else {
      window.localStorage.removeItem(STORAGE_KEY)
    }

    const data = {
      abi: form.abi.value,
      contract_name: form.contract_name.value,
      address: form.address.value
    }

    abis.push(data)
    setContracts(abis)

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(abis))
  }

  const download = (e) => {
    e.preventDefault()

    const file = new Blob([JSON.stringify(contracts)], { type: 'text/json;charset=utf-8' })

    const element = document.createElement('a')
    element.href = URL.createObjectURL(file)
    element.download = 'contract.json'
    document.body.appendChild(element)
    element.click()
    element.remove()
  }

  const restore = (e) => {
    e.preventDefault()
    const element = document.createElement('input')
    element.type = 'file'
    element.onchange = processFile
    document.body.appendChild(element)
    element.click()
    element.remove()
  }

  const processFile = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setRestorationFailed(false)

    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (evt) => {
      try {
        const contracts = JSON.parse(evt.target.result)
        setContracts(contracts)
        window.localStorage.setItem(STORAGE_KEY, evt.target.result)
      } catch (error) {
        // Show an error
        setRestorationFailed(true)
        console.log(error)
      }
    }

    reader.readAsText(file)
  }

  const validateABI = (e) => {
    const abi = e.target.value

    if (abi === '') {
      return setAbiInvalidFormat(false)
    }
    const isABIJSON = isJSON(abi)

    setIsSaveable(isABIJSON)
    setAbiInvalidFormat(!isABIJSON)
  }

  return (
    <Container>
      <FormContent ref={formRef}>

        <FormInputContainer>
          <FormLabel htmlFor='abi'>What is your contract ABI?</FormLabel>
          <FormTextArea id='abi' name='abi' onChange={validateABI} required placeholder='Paste your smart contract or interface ABI code here' />
          {abiInvalidFormat && <Error>ABI format is invalid.</Error>}
        </FormInputContainer>

        <FormInputContainer>
          <FormLabel htmlFor='name'>How would you want to remember your contract name in the future?</FormLabel>
          <Input id='name' name='contract_name' placeholder='Contract or interface name' showLabelPlaceHolder={false}>
            <InputHint>
              Enter the contract name or an easy to remember name for this contract
            </InputHint>
          </Input>
        </FormInputContainer>

        <FormInputContainer>
          <FormLabel htmlFor='address'>Have you deployed this contract on a blockchain network?</FormLabel>
          <Input id='address' name='address' placeholder='0x' showLabelPlaceHolder={false}>
            <InputHint>
              If you’d like to perform read and write operations on this contract, paste its address.
            </InputHint>
          </Input>
        </FormInputContainer>

        <FormAction>
          <Button hierarchy='secondary' disabled={!isSaveable} size='sm' iconLeading iconVariant='folder' onClick={saveToStorage}>Save to Local Storage</Button>
          <Button hierarchy='secondary' disabled={contracts.length === 0} size='sm' iconLeading iconVariant='download-cloud-01' onClick={download}>Save All to Your Computer</Button>
          <Button hierarchy='secondary' size='sm' type='file' iconLeading iconVariant='refresh-ccw-02' onClick={restore}>Restore from Your Computer</Button>
        </FormAction>

      </FormContent>
      <History>
        <HistoryTitle>Previous Contracts</HistoryTitle>
        <HistoryCTA>
          <Button hierarchy='secondary' disabled={contracts.length === 0} size='sm' iconLeading iconVariant='align-bottom-01' onClick={download}>Download Backup</Button>
          <Button hierarchy='secondary' size='sm' iconLeading iconVariant='refresh-ccw-02' onClick={restore}>Restore</Button>
        </HistoryCTA>
        <HistoryList>
          {contracts.length > 0 && contracts.map((contract, i) => {
            return (
              <HistoryListItem key={`contract-${i}`} onClick={(e) => { return restoreSpecificContract(i) }}>
                {contract.contract_name || 'Untitled'}
              </HistoryListItem>
            )
          })}
        </HistoryList>

        {restorationFailed && <Error>Restoration failed invalid JSON format.</Error>}

      </History>
    </Container>
  )
}

const Container = styled.div`
  ${utils.fullWidthContainer}
  display: flex;
  margin-top: 24px;
  gap: 40px;
  flex-direction: column;

  @media (min-width: 1024px) { 
    flex-direction: row;
    gap: 64px;
    margin-top: 56px;
  }
`

const FormContent = styled.form`
  display: flex;
  gap: 32px;
  flex-direction: column;
  width: 100%;

  @media (min-width: 1024px) { 
    width: 754px;  
  }
`

const Error = styled.p`
  color: ${props => props.theme.isLightMode ? colors.error[800] : colors.error[600]};\
  margin-top:6px;
  ${typography.styles.textSm}
  ${typography.weights.regular}
`

const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const FormLabel = styled.label`
  color: ${props => props.theme.isLightMode ? colors.gray[700] : colors.gray[300]};1
  ${typography.weights.medium}
  ${typography.styles.textSm}
`

const FormTextArea = styled.textarea`
  border: 1px solid ${colors.gray[300]};
  background-color: ${props => props.theme.isLightMode ? props.theme.primaryBackgroundColor : colors.gray[600]};
  height: 128px;
  padding: 12px 14px;
  border-radius: 8px;
  box-shadow: ${shadows.xs};
  outline: none;

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

  &:not(&:disabled) {
    &[data-state="hover"], :hover {
    }

    &[data-state="focussed"],
    :focus,
    :active,
    :focus-visible {

      outline: none;
      box-shadow: ${shadows.xs},
        0px 0px 0px 4px ${(props) => props.theme.isLightMode ? colors[primaryColorKey]['100'] : colors[primaryColorKey]['800']};
    }
  }

  :disabled {
    cursor: not-allowed;
  }
`

const FormAction = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
  
  button {
    background-color: ${props => props.theme.isLightMode ? props.theme.primaryBackgroundColor : colors.gray[600]};
    border-radius: 0;
    border: 1px solid ${props => props.theme.isLightMode ? colors.gray[300] : colors.gray[600]};
    color: ${props => props.theme.isLightMode ? colors.gray[700] : colors.white};
    ${props => !props.theme.isLightMode && `border-right-color: ${colors.gray[50]};`}
    ${props => !props.theme.isLightMode && `border-left-color: ${colors.gray[50]};`}

    &:nth-of-type(1) {
      border-right: none;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      ${props => !props.theme.isLightMode && `border-left-color: ${colors.gray[600]};`}

      @media (max-width: 768px) {
        border: 1px solid ${props => props.theme.isLightMode ? colors.gray[300] : colors.gray[600]};
        border-top-right-radius: 8px;
        border-bottom-left-radius: 0;
        border-bottom: none;
      }
    }
    
    &:nth-last-of-type(1) {
      border-left: none;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      ${props => !props.theme.isLightMode && `border-right-color: ${colors.gray[600]};`}

      @media (max-width: 768px) {
        border: 1px solid ${props => props.theme.isLightMode ? colors.gray[300] : colors.gray[600]};
        border-top-right-radius: 0;
        border-bottom-left-radius: 8px;
        border-top: none;
      }
    }
  }
`

const History = styled.div`
  padding: 24px 0px 24px 24px;
  border: 1px solid ${colors.gray[300]};
  border-radius: 8px;
  height: 516px;
  overflow-y: scroll;
  overflow-x: hidden;
`

const HistoryTitle = styled.h2`
  color: ${props => props.theme.isLightMode ? colors.gray[900] : colors.white};
  ${typography.styles.textLg}
  ${typography.weights.bold}
`

const HistoryList = styled.ul`
  width: 342px;
  
`
const HistoryListItem = styled.li`
  word-wrap: break-word;
  ${typography.weights.medium}
  ${typography.styles.textSm}
  color: ${props => props.theme.isLightMode ? colors.gray[900] : colors.white};
  cursor: pointer;
`

const HistoryCTA = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  gap: 8px;

  button {
    color: ${props => props.theme.isLightMode ? colors[primaryColorKey][600] : colors.gray[700]};
    ${typography.styles.textSm}
    background-color: ${colors.white};
  }
`

export { Encoder }
