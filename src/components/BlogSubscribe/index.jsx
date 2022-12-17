import {
  useRef,
  useState
} from 'react'

import Link from 'next/link'
import styled from 'styled-components'

import { colors } from '../../../styles/colors'
import { typography } from '../../../styles/typography'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { Input } from '../Input'
import { InputHint } from '../Input/Hint'
import { SuccessMessage } from './SuccessMessage'

export const BlogSubscribe = ({ showRSS = false, atomLink = '/atom.xml', rssLink = '/rss.xml' }) => {
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const formRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get('email')

    try {
      setIsPending(true)
      const res = await fetch('https://api2.neptunemutual.net/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()

      if (data.message === 'OK') {
        setIsSuccess(true)
        formRef.current.reset()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsPending(false)
    }
  }

  const buttonText = isPending ? 'Subscribing...' : isSuccess ? 'Subscribed' : 'Subscribe'

  return (
    <Container ref={formRef} onSubmit={handleSubmit}>
      <FormContainer>
        <InputContainer>
          <Input placeholder='Enter your email' type='email' name='email' autoComplete='off' disabled={isPending || isSuccess}>
            {isSuccess && <SuccessMessage />}
            <InputHint>Our <Link href='/policies/privacy-policy'>privacy policy</Link>  explains how we handle your data</InputHint>
          </Input>
        </InputContainer>
        <Button
          hierarchy='primary'
          size='xl'
          disabled={isPending || isSuccess}
        >
          {buttonText}
        </Button>
      </FormContainer>
      {showRSS && (
        <SubscribeContainer>
          <AtomContainer href={atomLink} target='_blank'>
            <Icon variant='rss-01' size={16} />
            Atom
          </AtomContainer>
          <RSSContainer href={rssLink} target='_blank'>
            <Icon variant='rss-01' size={16} />
            RSS
          </RSSContainer>
        </SubscribeContainer>
      )}
    </Container>
  )
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
`

const InputContainer = styled.div`
  flex:1;
  max-width: 360px;

  @media (max-width: 768px) {
    max-width: none;
  }
`

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const SubscribeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
  gap:6px;
`

const AtomContainer = styled.a`
  display: flex;
  align-items: center;
  gap:6px;
  padding: 2px 8px;
  background-color: ${props => props.theme.isLightMode ? colors.gray[600] : colors.gray[800]};
  color: ${colors.white};
  border-radius: 4px;
  ${typography.styles.textSm}
  ${typography.weights.semibold}
  cursor: pointer;
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03);

  :hover{
    color: ${colors.white};
  }
`

const RSSContainer = styled.a`
  display: flex;
  gap:6px;
  padding: 2px 8px;
  align-items: center;
  background-color: ${colors.orange[500]};
  color: ${colors.white};
  border-radius: 4px;
  ${typography.styles.textSm}
  ${typography.weights.semibold}
  cursor: pointer;
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03);

  :hover{
    color: ${colors.white};
  }
`
