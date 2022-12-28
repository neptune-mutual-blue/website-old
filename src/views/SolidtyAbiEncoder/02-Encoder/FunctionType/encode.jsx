import { useState, useEffect, useId } from 'react'

import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../../styles/colors'
import { typography } from '../../../../../styles/typography'
import { InputWithLabel } from '../../../../components/InputWithLabel'
import { TextArea } from '../../../../components/TextArea'
import { encodeData } from '../../../../helpers/solidity/methods'

const placeHoldersSamples = {
  uint256: 111222333,
  bytes32: '0x112233',
  address: '0x11...22'
}

const EncodeData = (props) => {
  const id = useId()
  const [inputData, setInputData] = useState({})
  const [outputData, setOutputData] = useState('')
  const [outputError, setOutputError] = useState('')

  useEffect(() => {
    const inputs = props.inputs

    if (inputs?.length === 0) {
      const encoded = encodeData(props.interface, props.func.name)
      if (encoded) setOutputData(encoded)
    }
  }, [props.func, props.interface, props.inputs])

  const checkNonEmptyInputs = (_inputData) => {
    const nonEmptyInput = props.inputs.find(i => {
      if (_inputData[i.name]) return true
      return false
    })

    return Boolean(nonEmptyInput)
  }

  const handleChange = (name, value) => {
    setInputData(_prev => ({ ..._prev, [name]: value }))

    const args = props.tupleInputs ? [inputData] : Object.values({ ...inputData, [name]: value })
    const encoded = encodeData(props.interface, props.func.name, args, (err) => {
      setOutputData('')

      if (checkNonEmptyInputs({ ...inputData, [name]: value })) setOutputError(err)
      else setOutputError('')
    })

    if (encoded) {
      setOutputData(encoded)
      setOutputError('')
    }
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
            onChange={e => handleChange(input.name, e.target.value)}
          />
        )
      })}

      <ResultContainer>
        <StyledTextArea
          label='Result'
          placeholder='0x'
          id={`${id}-result`}
          rows={5}
          value={outputData}
          onChange={() => {}}
          disabled
        />
        <span>{outputError}</span>
      </ResultContainer>

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

const StyledTextArea = styled(TextArea)`
  &:disabled {
    color: initial;
  }
`

const ResultContainer = styled.div`
  span {
    display: block;
    margin-top: 4px;
    ${typography.styles.textSm};
    color: ${colors.error[700]};
  }
`

export { EncodeData }
