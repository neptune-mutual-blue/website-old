import { useState, useCallback, useEffect, useId } from 'react'

import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../../styles/colors'
import { InputWithLabel } from '../../../../components/InputWithLabel'
import { TextArea } from '../../../../components/TextArea'

const placeHoldersSamples = {
  uint256: 111222333,
  bytes32: '0x112233',
  address: '0x11...22'
}

const EncodeData = (props) => {
  const id = useId()
  const [inputData, setInputData] = useState({})
  const [outputData, setOutputData] = useState('')

  const getEncodedData = useCallback((methodArgs = [], onError = () => {}) => {
    if (!props.interface || !props.func.name) return

    const methodName = props.func.name
    try {
      const iface = props.interface
      const encoded = iface.encodeFunctionData(methodName, methodArgs)
      return encoded
    } catch (err) {
      // console.log(`Error in encoding ${methodName} with args: [${methodArgs}]\n${err}`)
      onError()
    }
  }, [props.interface, props.func.name])

  useEffect(() => {
    const inputs = props.func.inputs

    if (inputs?.length === 0) {
      const encoded = getEncodedData()
      setOutputData(encoded)
    }
  }, [props.func, getEncodedData])

  const handleChange = (name, value) => {
    setInputData(_prev => ({ ..._prev, [name]: value }))

    const args = Object.values({ ...inputData, [name]: value })
    const encoded = getEncodedData(args, () => setOutputData(''))
    if (encoded) setOutputData(encoded)
  }

  return (
    <Container>
      {props.func.inputs.map((input, i) => {
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

      <TextArea
        label='Result'
        placeholder='0x'
        id={`${id}-result`}
        rows={5}
        value={outputData}
        onChange={() => {}}
      />

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

export { EncodeData }
