import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { colors } from '../../../../styles/colors'
import { FeaturedIcon } from '../../../components/FeaturedIcon'
import { typography } from '../../../../styles/typography'

const About = () => {
  const { t } = useTranslation('security')

  return (
    <Container>
      <FeaturedIcon size='xl' variant='shield-tick' />

      <AboutTitle>{t('Security Reviews')}</AboutTitle>
      <AboutContent>{t('Our decentralized insurance marketplace has been subjected to a number of smart contract audits, as well as a code review and penetration testing')}</AboutContent>
    </Container>
  )
}

const Container = styled.div``

const AboutTitle = styled.h2`
  margin-top: 24px;
  ${typography.styles.displayMd}
  ${typography.weights.semibold}
  color: ${props => props.theme.isLightMode ? colors.gray[900] : colors.white};

  @media (max-width: 768px) {
    margin-top: 12px;
  }
`

const AboutContent = styled.p`
  margin-top: 20px;
  color: ${props => props.theme.isLightMode ? colors.gray[600] : colors.white};
  ${typography.styles.textLg}
  ${typography.weights.regular}

@media (max-width: 768px) {
    margin-top: 16px;
  }
`

export { About }
