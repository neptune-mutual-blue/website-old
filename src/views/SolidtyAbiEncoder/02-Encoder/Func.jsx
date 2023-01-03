import { useEffect, useState } from 'react'

import styled from 'styled-components'
import { Icon } from '../../../components/Icon'
import { colors } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { EncodeData } from './FunctionType/encode'
import { ReadContract } from './FunctionType/read'
import { WriteContract } from './FunctionType/write'
import { getEncodedFnSignature } from '../../../helpers/solidity/methods'
import { createJoiSchema } from '../../../helpers/web3-tools/abi-encoder'

const TypeComponent = {
  encode_data: EncodeData,
  read_contract: ReadContract,
  write_contract: WriteContract
}

const Func = ({ type, func, ethersInterface, count, call, isReady }) => {
  const [isOpen, setIsOpen] = useState(false)

  const Component = TypeComponent[type]

  const inputs = func?.inputs?.[0]?.components || func?.inputs

  useEffect(() => {
    setIsOpen(false)
  }, [type])

  const toggle = (e) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  return (
    <Container className='item' id={`func-${count}`}>
      <ListHeader onClick={toggle}>
        <Name>{count}. {func.name} {type === 'write_contract' && `(${getEncodedFnSignature(ethersInterface, func.name)})`}</Name>

        <CallToAction>
          <Button title='Toggle'>
            <Icon size={16} variant={isOpen ? 'chevron-up' : 'chevron-down'} />
          </Button>
        </CallToAction>
      </ListHeader>
      {isOpen && (
        <Component
          type={type}
          func={func}
          inputs={inputs}
          tupleInputs={func.inputs[0]?.type === 'tuple'}
          call={call}
          isReady={isReady}
          ethersInterface={ethersInterface}
          joiSchema={createJoiSchema(inputs)}
        />
      )}
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
  cursor: pointer;
  display: flex;
  align-items: center;
`

const Name = styled.div`
  ${typography.weights.semibold}
`

const CallToAction = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  color: ${colors.black};
`

export { Func }
