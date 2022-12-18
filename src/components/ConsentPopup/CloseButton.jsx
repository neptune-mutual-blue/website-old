import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../styles/colors'
import { shadows } from '../../../styles/shadows'
import { Icon } from '../Icon'

export const CloseButton = (props) => {
  const { t } = useTranslation('common')

  return (
    <Container {...props} title={t('Close')}>
      <Icon variant='x-close' />
    </Container>
  )
}

const Container = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['500'] : colors.gray['300']};
  background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['25'] : colors.gray['700']};
  cursor: pointer;

  :hover {
    color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['600'] : colors.gray['200']};
    background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['50'] : colors.gray['600']};
  }

  :focus,
  :active,
  :focus-visible {
  background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['50'] : colors.gray['700']};

  outline: none;
  box-shadow: ${shadows.xs},
    0px 0px 0px 4px ${(props) => props.theme.isLightMode ? colors[primaryColorKey]['100'] : colors[primaryColorKey]['700']};
  }

  @media (max-width: 768px) {
    padding: 8px;
    border-radius: 8px;
  }

  svg {
    width: 24px;
    height: 24px;

    @media (max-width: 768px) {
      width: 20px;
      height: 20px;
    }
  }
`
