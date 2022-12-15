import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import {
  colors,
  primaryColorKey
} from '../../../../../styles/colors'
import { typography } from '../../../../../styles/typography'
import { Icon } from '../../../Icon'

export const DesktopNavMenuItemLink = ({ item }) => {
  const { t } = useTranslation('common')

  return (
    <Container href={item.href} as={item.isExternal ? 'a' : Link} target={item.isExternal ? '_blank' : null}>
      {item.icon && <Icon size={24} variant={item.icon} />}
      <div>
        <Title>{t(item.title)} {item?.badge && <Badge>{item.badge}</Badge>} {item.isExternal && <Icon size={18} variant='link-external-01' />} </Title>
        <Description>{t(item.description)}</Description>
      </div>
    </Container>
  )
}

const Container = styled.a`
  display: flex;
  align-items: flex-start;
  padding: 12px;
  padding-right: 0;
  gap: 16px;
  border-radius: 8px;

  :hover {
    background-color: ${colors[primaryColorKey]['600']};

    h3,
    svg {
      color: white;
    }

    p {
      color: ${colors.gray['50']};
    }
  }

  svg {
    flex-shrink: 0;
    color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['600'] : colors[primaryColorKey]['300']};
  }
`

const Title = styled.h3`
  color: ${props => props.theme.color};
  display:flex;
  align-items: center;

  ${typography.styles.textMd};
  ${typography.weights.semibold};

  svg {
    margin-left: 10px;
  }
`

const Description = styled.p`
  margin-top: 4px;
  color: ${props => props.theme.secondaryColor};

  ${typography.styles.textSm};
  ${typography.weights.regular};
`
const Badge = styled.div`
  ${typography.styles.textSm};
  ${typography.weights.medium};
  color: ${props => props.theme.isLightMode ? colors['blue-dark'][700] : colors['blue-dark'][50]};
  background: ${props => props.theme.isLightMode ? colors['blue-dark'][50] : colors['blue-dark'][700]};
  padding: 2px 10px;
  border-radius: 16px;
  margin-left: 8px;
`
