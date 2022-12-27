import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { Func } from './Func'
import { Button } from '../../../components/Button'
import { useState } from 'react'

// function
// https://github.com/neptune-mutual-blue/protocol/tree/develop/abis
// Encode
// Everythiing function

// Read Contract
// view and pure

// Write
// Everythiing else

const filter = {
  encode_data: {
    stateMutability: '[a-z]'
  },
  read_contract: {
    stateMutability: '(view|pure)'
  },
  write_contract: {
    stateMutability: '^(?!(view|pure))'
  }
}

const Result = (props) => {
  let count = 0
  const [type, setType] = useState('encode_data')

  const handleType = (e) => {
    e.preventDefault()
    setType(e.target.parentNode.value || e.target.value)
  }

  const validateStateMutability = (stateMutability) => {
    const re = new RegExp(filter[type].stateMutability)
    return re.test(stateMutability)
  }

  return (
    <Container>
      <Header>
        <Title>{props.title}</Title>
        <Address>{props.address}</Address>
      </Header>

      {Array.isArray(props.abi) && props.abi.length > 0 && (
        <CallToAction>
          <LeftGroup>
            <Btn hierarchy='secondary' active={type === 'encode_data'} size='sm' value='encode_data' onClick={handleType}>Encode Data</Btn>
            <Btn hierarchy='secondary' active={type === 'read_contract'} size='sm' value='read_contract' onClick={handleType}>Read Contract</Btn>
            <Btn hierarchy='secondary' active={type === 'write_contract'} size='sm' value='write_contract' onClick={handleType}>Write Contract</Btn>
          </LeftGroup>
          <RigthGroup>
            {type !== 'encode_data' && <Button hierarchy='primary' size='sm' iconLeading iconVariant='wallet-04'>Connect Wallet</Button>}
          </RigthGroup>
        </CallToAction>
      )}

      <ListContainer>
        {Array.isArray(props.abi) && props.abi.map((func, i) => {
          if (func.type === 'function' && validateStateMutability(func.stateMutability)) {
            count++

            return <Func type={type} key={`func-${i}`} func={func} count={count} />
          }
          return true
        })}
      </ListContainer>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 40px;

  @media (min-width: 1024px) { 
    margin-top: 98px;
  }
`

const Header = styled.div``

const Title = styled.h2`
  color: ${props => props.theme.isLightMode ? colors.gray[900] : colors.white};
  ${typography.styles.displayXs}
  ${typography.weights.semibold}
  margin-bottom: 12px;
`

const Address = styled.p`
  color: ${props => props.theme.isLightMode ? colors.gray[800] : colors.gray[25]};
  ${typography.styles.textMd}
  ${typography.weights.regular}
`

const ListContainer = styled.div`
  margin-top: 24px;
  overflow: hidden;

  .item {
    border-top: none;

    &:nth-of-type(1) {
      border-top: 1px solid ${props => props.theme.isLightMode ? colors.gray[300] : colors.gray[700]};
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    &:nth-last-of-type(1) {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      overflow: hidden;
    }
  }
`

const CallToAction = styled.div`
  display: flex;
  margin: 24px 0;
  justify-content: space-between;
`
const LeftGroup = styled.div`
  display: flex;
  gap: 8px;
`
const RigthGroup = styled.div``

const Btn = styled(Button)`
  padding: 8px 12px;
  ${typography.weights.semibold}
  ${typography.styles.textSm}
  cursor: pointer;
  color: ${props => props.theme.isLightMode ? colors.gray[500] : colors.gray[300]};
  border: none;
  box-shadow: none;

  ${props => {
    if (props.active && props.theme.isLightMode) {
      return `
        background-color: ${colors[primaryColorKey][25]};
        color: ${colors[primaryColorKey][700]};
        `
    }
    if (props.active && !props.theme.isLightMode) {
      return `
        background-color: ${colors.gray[600]};
        color: ${colors.white};
      `
    }
  }}
`

export { Result }
