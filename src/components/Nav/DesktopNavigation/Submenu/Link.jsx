import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../../styles/colors'
import { typography } from '../../../../../styles/typography'
import { Icon } from '../../../Icon'

export const DesktopNavMenuItemLink = ({ item }) => {
  const { t } = useTranslation('common')

  return (
    <Container href={item.href} as={item.isExternal ? 'a' : Link} target={item.isExternal ? '_blank' : null}>
      {item.icon && <Icon size={24} variant={item.icon} />}
      <div>
        <Title>{t(item.title)} {item?.badge && <Badge>{item.badge}</Badge>}</Title>
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
    background-color: ${props => props.theme.isLightMode ? colors.gray['50'] : colors.gray['700']};
  }

  svg {
    flex-shrink: 0;
    color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['600'] : colors[primaryColorKey]['500']};
  }
`

const Title = styled.h3`
  color: ${props => props.theme.color};
  display: flex;

  ${typography.styles.textMd};
  ${typography.weights.semibold};
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
  color: ${props => props.theme.isLightMode ? colors.success[700] : colors.success[400]};
  background: ${props => props.theme.isLightMode ? colors.success[50] : colors.gray[700]};
  padding: 2px 10px;
  border-radius: 16px;
  margin-left: 8px;
`
