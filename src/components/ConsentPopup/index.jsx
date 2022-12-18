import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { shadows } from '../../../styles/shadows'
import { typography } from '../../../styles/typography'
import { colors, primaryColorKey } from '../../../styles/colors'
import { Button } from '../Button'
import { CloseButton } from './CloseButton'
import { DeclineButton } from './DeclineButton'
import Link from 'next/link'

export const ConsentPopup = ({ setAccepted }) => {
  const [open, setOpen] = useState(true)
  const { t } = useTranslation('common')

  const handleAccept = () => {
    setAccepted(true)
    setOpen(false)
  }

  const handleDecline = () => {
    setAccepted(false)
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleKeyboardEsc = () => {}

  return (
    <StyledDialog open={open} onClose={handleKeyboardEsc}>
      <Panel>

        <ContentContainer>

          <ButtonContainer>
            <CloseButton onClick={handleClose} />
          </ButtonContainer>

          <TextContainer>
            <Title>{t('Cookie Settings')}</Title>
            <Description>
              {t('By clicking “Accept All Cookies”, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage and assist in our marketing efforts.')}
            </Description>

            <StyledLink href='/policies/terms-of-use'>{t('Terms of Use')}</StyledLink>
          </TextContainer>

          <ActionsContainer>
            <Button
              hierarchy='primary'
              size='xl'
              onClick={handleAccept}
            >
              {t('Accept')}
            </Button>
            <DeclineButton onClick={handleDecline}>
              {t('Decline')}
            </DeclineButton>
          </ActionsContainer>

        </ContentContainer>

      </Panel>
    </StyledDialog>
  )
}

const StyledDialog = styled(Dialog)`
`

const ContentContainer = styled.div`
  position: relative;
  padding: 24px 0px 0px;
  background-color: ${props => props.theme.primaryBackgroundColor};
  box-shadow: ${shadows.lg};
`

const ButtonContainer = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
`

const TextContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding: 0px 24px 24px;
  gap: 12px;
`

const Title = styled(Dialog.Title)`
  color: ${props => props.theme.color};

  ${typography.styles.displayXs};
  ${typography.weights.semibold};
  
`

const Description = styled(Dialog.Description)`
  max-width: 429px;

  color: ${props => props.theme.color};

  ${typography.styles.textMd};
  ${typography.weights.regular};
`

const StyledLink = styled(Link)`
  display: inline-flex;
  text-decoration: underline;
  color: ${props => props.theme.color};
`

const Panel = styled(Dialog.Panel)`
  z-index: 30;
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  width: 100%;
  background-color: ${colors.gray['900'].startsWith('#') ? colors.gray['900'] + 'b2' : 'rgba(0, 0, 0, 0.7)'};

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 24px;
`

const ActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 24px;
  gap: 8px;

  background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['50'] : colors.gray['700']};
`
