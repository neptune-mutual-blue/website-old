import styled, { css } from 'styled-components'
import { colors } from '../../../styles/colors'
import { typography } from '../../../styles/typography'
import { Icon } from '../../components/Icon'

export const Option = (props) => {
  const { id, name, onClick, iconVariant } = props

  if (name.toLowerCase() === 'metamask') {
    if (!(window.web3 || window.ethereum)) {
      return (
        <StyledLink
          href='https://metamask.io/'
          target='_blank'
          rel='noreferrer noopener'
        >
          <Icon variant={iconVariant} size={24} />
          <p>Install Metamask</p>
        </StyledLink>
      )
    }
  }

  if (name.toLowerCase() === 'binance chain wallet') {
    if (!window.BinanceChain) {
      return (
        <StyledLink
          href='https://docs.binance.org/smart-chain/wallet/binance.html'
          target='_blank'
          rel='noreferrer noopener'
        >
          <Icon variant={iconVariant} size={24} />
          <p>Install Binance Wallet</p>
        </StyledLink>
      )
    }
  }

  return (
    <StyledButton
      key={id}
      onClick={onClick}
      type='button'
    >
      <Icon variant={iconVariant} size={24} />
      <p>{name}</p>
    </StyledButton>
  )
}

const LinkStyle = css`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px 24px;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray[200]};
  border-radius: 8px;
  cursor: pointer;

  p {
    ${typography.styles.textSm};
    ${typography.weights.medium};
    color: ${colors.black};
    margin-left: 24px;
  }
`

const StyledButton = styled.button`
  ${LinkStyle}
`

const StyledLink = styled.a`
  ${LinkStyle}
`
