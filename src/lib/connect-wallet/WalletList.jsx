import styled from 'styled-components'
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
  display: flex;
  flex-direction: column;
  gap: 12px;
`
