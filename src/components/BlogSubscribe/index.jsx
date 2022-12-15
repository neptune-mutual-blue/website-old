import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'
import { getApiHeaders } from '../../../services/api/config'
import { request } from '../../../services/http/request'
import { colors } from '../../../styles/colors'
import { typography } from '../../../styles/typography'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { Input } from '../Input'
import { InputHint } from '../Input/Hint'

export const BlogSubscribe = () => {
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get('email')

    try {
      const res = await request.post('https://api.neptunemutual.net/subscribe', getApiHeaders(), { email: email })
      console.log(res)
    } catch (error) {
      setError(true)
    }
  }

  return (
    <Container onSubmit={handleSubmit}>
      <FormContainer>
        <InputContainer>
          <Input placeholder='Enter your email' type='email' name='email' autoComplete='off'>
            <InputHint>We care about your data in our <Link href='#'>privacy policy</Link>.</InputHint>
          </Input>
        </InputContainer>
        <Button
          hierarchy='primary'
          size='xl'
        >
          Subscribe
        </Button>
      </FormContainer>
      {error && <p>{error}</p>}
      <SubscribeContainer>
        <AtomContainer href='/atom.xml'>
          <Icon variant='rss-01' size={16} />
          Atom
        </AtomContainer>
        <RSSContainer href='/rss.xml'>
          <Icon variant='rss-01' size={16} />
          RSS
        </RSSContainer>
      </SubscribeContainer>
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

const AtomContainer = styled(Link)`
  display: flex;
  gap:6px;
  padding: 4px 8px;
  background-color: ${props => props.theme.isLightMode ? colors.gray[600] : colors.gray[800]};
  color: ${colors.white};
  border-radius: 4px;
  ${typography.styles.textSm}
  ${typography.weights.semibold}
  cursor: pointer;

  :hover{
    color: ${colors.white};
  }
`

const RSSContainer = styled(Link)`
  display: flex;
  gap:6px;
  padding: 4px 8px;
  background-color: ${colors.orange[500]};
  color: ${colors.white};
  border-radius: 4px;
  ${typography.styles.textSm}
  ${typography.weights.semibold}
  cursor: pointer;

  :hover{
    color: ${colors.white};
  }
`
