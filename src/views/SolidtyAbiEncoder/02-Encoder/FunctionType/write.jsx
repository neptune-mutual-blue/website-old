import { useId, useState } from 'react'

import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../../styles/colors'
import { InputWithLabel } from '../../../../components/InputWithLabel'
import { Button } from '../../../../components/Button'
import { typography } from '../../../../../styles/typography'

const placeHoldersSamples = {
  uint256: 111222333,
  bytes32: '0x112233',
  address: '0x11...22'
}

const WriteContract = (props) => {
  const id = useId()
  const [inputData, setInputData] = useState({})
  const [error, setError] = useState('')

  async function handleWrite () {
    if (error) setError('')

    const methodName = props.func.name
    const args = props.tupleInputs ? [inputData] : Object.values(inputData)
    const res = await props.call(methodName, args)

    if (res.error) setError(res.error)
    else setError('')
  }

  const validateInput = (value = '', type) => {
    if (!value) return true

    let regex = ''
    if (type === 'address') regex = /^0x([a-z]|[A-Z]|[0-9]){40}$/
    if (type === 'uint256') regex = /^\d+$/
    if (type === 'bytes32') regex = /^0x([a-z]|[A-Z]|[0-9])+$/
    if (type === 'bool') regex = /^(true|false)$/

    if (value.match(regex)) return true
    return false
  }

  const checkInputErrors = () => {
    const _error = props.inputs.find(i => {
      const _value = inputData[i.name]
      const _type = i.type
      if (!_value || !validateInput(_value, _type)) return true
      return false
    })
    return Boolean(_error)
  }

  const handleInputChange = (name, value = '') => {
    setInputData(_prev => ({ ..._prev, [name]: value }))
    if (error) setError('')
  }

  return (
    <Container>
      {props.inputs.map((input, i) => {
        return (
          <InputWithLabel
            key={`input-${i}`}
            label={`${input.name} (${input.type})`}
            placeholder={placeHoldersSamples[input.type]}
            id={`${id}-${i}`}
            onChange={e => handleInputChange(input.name, e.target.value, input.type)}
            error={!validateInput(inputData[input.name], input.type)}
          />
        )
      })}

      <BtnWrapper>
        <Btn
          hierarchy='primary'
          size='sm'
          onClick={handleWrite}
          disabled={!props.isReady || checkInputErrors()}
        >
          Write
        </Btn>
        <span className='error'>{error}</span>
      </BtnWrapper>

    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey][25] : colors.gray[900]};
  padding: 32px 24px;
  gap: 24px;
`

const Btn = styled(Button)`
  width: fit-content;
  ${typography.weights.semibold}
  ${typography.styles.textSm}

  &:disabled {
    opacity: 0.8;
    color: ${colors.gray[400]};
  }
`

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media screen and (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
  }

  span.error {
    ${typography.styles.textSm}
    color: ${colors.error[700]};
  }
`

export { WriteContract }
