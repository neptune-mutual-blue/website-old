import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { wallets } from './config/wallets'
import useAuth from './hooks/useAuth'
import styled from 'styled-components'
import { Dialog } from '@headlessui/react'

import { WalletList } from './WalletList'
import { Disclaimer } from './Disclaimer'
import { Loader } from './Loader'
import { Modal } from '../../components/Modal'
import { Icon } from '../../components/Icon'
import { colors } from '../../../styles/colors'
import { utils } from '../../../styles/utils'
import { typography } from '../../../styles/typography'

export const Popup = ({ isOpen, onClose, notifier }) => {
  const [isConnecting, setIsConnecting] = useState(false)
  const { active } = useWeb3React()

  const { login } = useAuth(notifier)

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
        <StyledDialogTitle as='h3'>
          Connect Wallet
        </StyledDialogTitle>

        <CloseButton
          onClick={onClose}
        >
          <span>Close</span>
          <Icon variant='x-close' size={24} />
        </CloseButton>

        {!isConnecting && (
          <>
            <Disclaimer />
            <WalletList wallets={wallets} onConnect={onConnect} />
          </>
        )}

        {isConnecting && (
          <>
            <LoaderWrapper>
              <Loader />
              <p>Connecting</p>
            </LoaderWrapper>
          </>
        )}
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
  max-width: 28rem; 
  border-radius: 1.5rem; 
  padding: 3rem; 
  background: #f1f3f6;
  
  @media screen and (max-width: 768px) {
    padding: 2rem; 
  }
`

const StyledDialogTitle = styled(Dialog.Title)`
  color: ${colors.black};
  ${typography.styles.displayXs}
  ${typography.weights.bold}
`

const CloseButton = styled.button`
  display: flex; 
  position: absolute; 
  top: 1.75rem; 
  right: 3rem; 
  color: #000000; 
  justify-content: center; 
  align-items: center; 
  border-radius: 0.375rem; 

  span {
    ${utils.srOnly}
  }
`

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 32px;
  justify-content: flex-start;
`
