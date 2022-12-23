import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import styled from 'styled-components'
import { Icon } from '../../../components/Icon'
import { colors } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { copyToClipBoard, getDns } from '../../../helpers'
import { EncodeData } from './FunctionType/encode'
import { ReadContract } from './FunctionType/read'
import { WriteContract } from './FunctionType/write'

const TypeComponent = {
  encode_data: EncodeData,
  read_contract: ReadContract,
  write_contract: WriteContract
}

const Func = (props) => {
  const { pathname } = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const Component = TypeComponent[props.type]

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1500)
    }
  }, [copied])

  const toggle = (e) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  const copy = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const origin = typeof window === 'undefined' ? getDns() : window.location.origin
    const url = `${origin}${pathname}?key=${props.count}#func-${props.count}`

    copyToClipBoard(url)
    setCopied(true)
  }

  return (
    <Container className='item' id={`func-${props.count}`}>
      <ListHeader onClick={toggle}>
        <Name>{props.count}. {props.func.name} </Name>

        <CallToAction>
          <Button title='Copy Permalink' onClick={copy}>
            <Icon size={16} variant={copied ? 'check' : 'link-03'} />
          </Button>
          <Button title='Toggle'>
            <Icon size={16} variant={isOpen ? 'chevron-up' : 'chevron-down'} />
          </Button>
        </CallToAction>
      </ListHeader>
      {isOpen && <Component type={props.type} func={props.func} />}
    </Container>
  )
}

const Container = styled.div`
  border: 1px solid ${props => props.theme.isLightMode ? colors.gray[300] : colors.gray[700]};
  cursor: pointer;
`

const ListHeader = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: -1;
`

const Button = styled.button`
  outline: none;
  cursor: pointer;
  z-index: 10;
`

const Name = styled.div`
  ${typography.weights.semibold}
`

const CallToAction = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  color: ${colors.black};
  z-index: 9;
`

export { Func }
