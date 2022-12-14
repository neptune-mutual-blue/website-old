import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../../styles/colors'
import { typography } from '../../../../../styles/typography'
import { Icon } from '../../../Icon'

export const LinkItem = ({ item }) => {
  const { t } = useTranslation('common')

  if (item.isExternal) {
    return (
      <Container as='a' href={item.href} target='_blank' rel='noopener noreferrer'>
        {item.icon && <Icon size={24} variant={item.icon} />}
        {t(item.title)}
      </Container>
    )
  }

  return (
    <Container href={item.href}>
      {item.icon && <Icon size={24} variant={item.icon} />}
      {t(item.title)}
    </Container>
  )
}

const Container = styled(Link)`
  display: flex;
  align-items: center;
  margin-top: -12px;
  margin-bottom: -12px;
  padding: 12px 16px;
  gap: 16px;
  color: ${props => props.theme.isLightMode ? colors.gray['600'] : colors.gray['400']};
  border-radius: 8px;

  ${typography.styles.textMd};
  ${typography.weights.semibold};

  :hover {
    color: ${props => props.theme.color};
  }

  svg {
    color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['600'] : colors[primaryColorKey]['500']};
  }
`
