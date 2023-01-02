import styled, { css, useTheme } from 'styled-components'
import { colors } from '../../../styles/colors'
import { typography } from '../../../styles/typography'
import { Icon } from '../../components/Icon'

export const Option = (props) => {
  const { id, name, onClick, iconVariant, iconVariantDark } = props
  const { isLightMode } = useTheme()

  if (name.toLowerCase() === 'metamask') {
    if (!(window.web3 || window.ethereum)) {
      return (
        <StyledLink
          href='https://metamask.io/'
          target='_blank'
          rel='noreferrer noopener'
        >
          <Icon variant={isLightMode ? iconVariant : iconVariantDark} size={20} />
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
          <Icon variant={isLightMode ? iconVariant : iconVariantDark} size={20} />
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
      <Icon variant={isLightMode ? iconVariant : iconVariantDark} size={20} />
      <p>{name}</p>
    </StyledButton>
  )
}

const LinkStyle = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 18px;
  background-color: ${props => props.theme.isLightMode ? 'transparent' : colors.gray[600]};
  border: 1px solid ${props => props.theme.isLightMode ? colors.gray[300] : colors.gray[500]};
  border-radius: 8px;
  cursor: pointer;

  p {
    ${typography.styles.textMd};
    ${typography.weights.semibold};
    color: ${props => props.theme.isLightMode ? colors.gray[700] : colors.gray[25]};
  }
`

const StyledButton = styled.button`
  ${LinkStyle}
`

const StyledLink = styled.a`
  ${LinkStyle}
`
