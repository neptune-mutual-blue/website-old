import Link from 'next/link'
import styled from 'styled-components'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import { colors, primaryColorKey } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { Icon } from '../../../components/Icon'

const Card = (props) => {
  const { t } = useTranslation('security')

  return (
    <Container>
      <IconNTag>
        <IconContainer>
          <Image alt={props.audit.partner.icon.alt} width='48' height='48' src={`${props.audit.partner.icon.image}`} />
        </IconContainer>
        <Tag color={props.audit.badges[0].color}>{props.audit.badges[0].text}</Tag>
      </IconNTag>
      <CardTitle>{props.audit.title}</CardTitle>
      <CardContent>{props.audit.intro}</CardContent>

      <Link href={`/security/${props.audit.slug}`}> {t('Show Result')} <Icon variant='arrow-right' size={18} /> </Link>
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: ${props => props.theme.isLightMode ? colors.gray[50] : colors.gray[700]}; 

  a {
    margin-top: 20px;
    ${typography.styles.textSm}
    ${typography.weights.medium}
    display: flex;
    align-items: center;
    gap: 8px;
    
  }
`
const CardTitle = styled.p`
  color: ${props => props.theme.isLightMode ? colors.gray[900] : colors.white};
  margin-bottom: 8px;
  ${typography.styles.textXl}
  ${typography.weights.semibold}
`
const CardContent = styled.p`
  color: ${props => props.theme.isLightMode ? colors.gray[600] : colors.white};
  ${typography.weights.regular}
  ${typography.styles.textMd}
`

const IconNTag = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 56px;
`

const IconContainer = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 12px;
  background-color: ${props => props.theme.isLightMode ? colors.indigo[600] : colors.gray[600]};
`

const Tag = styled.span`
  height: fit-content;
  padding: 2px 10px;
  border-radius: 16px;
  background-color: ${props => props.theme.isLightMode ? colors[props.color || primaryColorKey]['50'] : colors.gray['600']};
  color: ${props => props.theme.isLightMode ? colors[props.color || primaryColorKey]['700'] : colors[props.color || primaryColorKey]['400']};
  ${typography.weights.medium}
  ${typography.styles.textSm}
`

export { Card }
