import styled from 'styled-components'
import { colors } from '../../../styles/colors'
import { typography } from '../../../styles/typography'

export const Disclaimer = () => {
  return (
    <P>
      By connecting a wallet, you agree to Neptune Mutual
      <StyledLink
        href='https://docs.neptunemutual.com/usage/terms-of-use'
        target='_blank'
      >
        {' '}
        Terms &amp; Conditions{' '}
      </StyledLink>
      and acknowledge that you have read and understand the Neptune Mutual
      <StyledLink
        href='https://docs.neptunemutual.com/usage/disclaimer'
        target='_blank'
      >
        {' '}
        Protocol Disclaimer
      </StyledLink>
      .
    </P>
  )
}

const P = styled.p`
  ${typography.styles.textSm};
  color: ${colors.black};
  margin-top: 24px;
`

const StyledLink = styled.a`
  color: ${colors.blue[700]};
  ${typography.weights.medium}
  
  &:hover {
    text-decoration: underline;
    color: ${colors.blue[700]};
  }
`
