import { useEffect, useState } from 'react'

import styled from 'styled-components'
import { Icon } from '../../../components/Icon'
import { colors } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { EncodeData } from './FunctionType/encode'
import { ReadContract } from './FunctionType/read'
import { WriteContract } from './FunctionType/write'
import { encodeData } from '../../../helpers/solidity/methods'

const TypeComponent = {
  encode_data: EncodeData,
  read_contract: ReadContract,
  write_contract: WriteContract
}

const defaultData = type => {
  switch (type) {
    case 'bytes32':
    case 'bytes':
      return '0x7465737400000000000000000000000000000000000000000000000000000000'

    case 'uint256':
      return '1'

    case 'address':
      return '0x0000000000000000000000000000000000000000'

    case 'bool':
      return 'true'

    default:
      return '0x7465737400000000000000000000000000000000000000000000000000000000'
  }
}

const Func = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  const Component = TypeComponent[props.type]

  const [encodedFn, setEncodedFn] = useState('')
  const inputs = props?.func?.inputs?.[0]?.components || props?.func?.inputs

  useEffect(() => {
    if (props.type !== 'write_contract') return

    const isTupleInputs = props.func.inputs[0]?.type === 'tuple'
    let encodeArgs = []
    if (inputs?.length) {
      if (isTupleInputs) {
        const args = {}
        inputs.map(i => {
          args[i.name] = defaultData(i.type)
          return true
        })
        encodeArgs = [args]
      } else {
        encodeArgs = inputs.map(i => defaultData(i.type))
      }
    }

    const _encodedFn = encodeData(props.interface, props.func.name, encodeArgs)
    if (_encodedFn) setEncodedFn(_encodedFn.slice(0, 10))
  }, [props.func.name, props.func.inputs, props.interface, props.type, inputs])

  useEffect(() => {
    setIsOpen(false)
  }, [props.type])

  const toggle = (e) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  return (
    <Container className='item' id={`func-${props.count}`}>
      <ListHeader onClick={toggle}>
        <Name>{props.count}. {props.func.name} {props.type === 'write_contract' && `(${encodedFn})`}</Name>

        <CallToAction>
          <Button title='Toggle'>
            <Icon size={16} variant={isOpen ? 'chevron-up' : 'chevron-down'} />
          </Button>
        </CallToAction>
      </ListHeader>
      {isOpen &&
        <Component
          type={props.type}
          func={props.func}
          inputs={inputs}
          tupleInputs={props.func.inputs[0]?.type === 'tuple'}
          call={props.call}
          isReady={props.isReady}
          interface={props.interface}
        />}
    </Container>
  )
}

const Container = styled.div`
  border: 1px solid ${props => props.theme.isLightMode ? colors.gray[300] : colors.gray[700]};
`

const ListHeader = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: -1;
  cursor: pointer;
`

const Button = styled.button`
  outline: none;
  cursor: pointer;
`

const Name = styled.div`
  ${typography.weights.semibold}
`

const CallToAction = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  color: ${colors.black};
  /* z-index: 9; */
`

export { Func }
