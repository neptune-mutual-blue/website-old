import Link from 'next/link'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { colors } from '../../../styles/colors'
import { typography } from '../../../styles/typography'
import { Icon } from '../Icon'

const Breadcrumbs = (props) => {
  const { t } = useTranslation('common')

  return (
    <Trail className={props?.className}>
      {props.crumbs.map((link, i) => {
        return (
          <Fragment key={`link-${i}`}>
            <Crumb isLast={props.crumbs.length === i} href={link.link}>{t(`${link.name}`)}</Crumb>
            {i < (props.crumbs.length - 1) && <Icon size='15' variant='chevron-right' />}
          </Fragment>
        )
      })}
    </Trail>
  )
}

const Trail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 36px;
  flex-wrap: wrap;
  gap: 8px;

  svg {
    color: ${colors.gray[300]};
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 28px;
  }

`
const Crumb = styled(Link)`
  display: inline-block;
  ${typography.styles.textSm}
  ${typography.weights.medium}
  color: ${props => (props.theme.isLightMode ? colors.gray[600] : colors.gray[300])};
  padding: 4px 8px;

  &:nth-of-type(1) {
  }

  &:nth-last-of-type(1) {
    background-color: ${props => (props.theme.isLightMode ? colors.gray[200] : colors.gray[600])};
    color: ${props => (props.theme.isLightMode ? colors.gray[700] : colors.gray[25])};
    border-radius: 6px;
    ${typography.weights.semibold}
  }

  :hover{
    background-color: ${props => (props.theme.isLightMode ? colors.gray[50] : colors.gray[600])};
    border-radius:6px;
    color: ${props => (props.theme.isLightMode ? colors.gray[700] : colors.gray[25])};
  }
`

export { Breadcrumbs }
