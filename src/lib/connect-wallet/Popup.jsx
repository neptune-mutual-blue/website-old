import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { wallets } from './config/wallets'
import useAuth from './hooks/useAuth'
import styled from 'styled-components'
import { Dialog } from '@headlessui/react'

import { WalletList } from './WalletList'
import { Disclaimer } from './Disclaimer'
import { Modal } from '../../components/Modal'
import { Icon } from '../../components/Icon'
import { colors, primaryColorKey } from '../../../styles/colors'
import { utils } from '../../../styles/utils'
import { typography } from '../../../styles/typography'

export const Popup = ({ isOpen, onClose, notifier = console.log }) => {
  const [isConnecting, setIsConnecting] = useState(false)
  const { active } = useWeb3React()

  const { login } = useAuth((_error) => {
    setIsConnecting(false)
    notifier(_error)
  })

  useEffect(() => {
    if (!isOpen) setIsConnecting(false)

    if (active) {
      setIsConnecting(false)
      onClose()
    }
  }, [isOpen, active, onClose])

  const onConnect = (id) => {
    setIsConnecting(true)
    const wallet = wallets.find((x) => x.id === id)
    const connectorName = wallet.connectorName
    login(connectorName)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Wrapper>
        <WalletIcon>
          <Icon variant='wallet-04' size={24} />
        </WalletIcon>

        <StyledDialogTitle as='h3'>
          Connect Wallet
        </StyledDialogTitle>

        <CloseButton
          onClick={onClose}
        >
          <span>Close</span>
          <Icon variant='x-close' size={24} />
        </CloseButton>

        <Disclaimer />
        <WalletList
          wallets={wallets}
          onConnect={onConnect}
          isConnecting={isConnecting}
        />

      </Wrapper>
    </Modal>
  )
}

const Wrapper = styled.div`
  display: inline-block; 
  position: relative; 
  margin-top: 2rem;
  margin-bottom: 2rem; 
  transition-property: all; 
  text-align: left; 
  vertical-align: middle; 
  max-width: 400px; 
  border-radius: 12px; 
  padding: 24px; 
  background: ${props => props.theme.isLightMode ? colors.white : colors.gray[800]};
  
  @media screen and (max-width: 768px) {
    padding: 2rem; 
  }
`

const WalletIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  color: ${props => props.theme.isLightMode ? colors[primaryColorKey][600] : colors.white};
  background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey][100] : colors.gray[600]};
  width: max-content; 
  border-radius: 50%;
  box-shadow: 0 0 0 8px ${props => props.theme.isLightMode ? colors[primaryColorKey][50] : colors.gray[700]};
`

const StyledDialogTitle = styled(Dialog.Title)`
  margin-top: 16px;
  color: ${props => props.theme.isLightMode ? colors.black : colors.white};
  ${typography.styles.textLg}
  ${typography.weights.semibold}
`

const CloseButton = styled.button`
  display: flex; 
  position: absolute; 
  padding: 6px;
  top: 16px; 
  right: 16px; 
  color: ${props => props.theme.isLightMode ? colors.gray[500] : colors.white}; 
  justify-content: center; 
  align-items: center; 
  border-radius: 0.375rem; 
  cursor: pointer;

  span {
    ${utils.srOnly}
  }
`
