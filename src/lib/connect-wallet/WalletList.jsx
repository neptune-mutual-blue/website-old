import styled from 'styled-components'
import { colors } from '../../../styles/colors'
import { typography } from '../../../styles/typography'
import { Option } from './Option'

export const WalletList = ({ wallets, onConnect }) => {
  return (
    <Container>
      {wallets.map((wallet) => (
        <Option
          key={wallet.id}
          onClick={() => onConnect(wallet.id)}
          {...wallet}
        />
      ))}
    </Container>
  )
}

const Container = styled.div`
  margin-top: 32px;
  ${typography.styles.textSm};
  ${typography.weights.regular};
  color: ${colors.black};
`
