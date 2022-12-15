import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import {
  colors,
  primaryColorKey
} from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'

const Hero = () => {
  const { t } = useTranslation('security')

  return (
    <Container>
      <InnerContainer>
        <Content>
          <H1>
            <Subheader>{t('Audits, Bug Bounty, and More')}</Subheader>
            <HeaderTitle>{t('Security and Cyber Hygiene')}</HeaderTitle>
          </H1>
          <HeaderContent>
            {t('Here at Neptune Mutual, we value security and protection highly. We have spent a lot of time and resource doing code reviews of our smart contracts, frontend, and backend. We have security firms that we deal with on a regular basis to do security review and penetration testing on our hosting systems and applications. In addition, we have a stringent cyber hygiene policy that everyone must follow.')}
          </HeaderContent>
        </Content>
        <ImageContainer>
          <Image alt='Shield' src='/assets/images/hero/shield.png' width={300} height={300} />
        </ImageContainer>

      </InnerContainer>
    </Container>
  )
}

const H1 = styled.h1``

const Container = styled.div`
  background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['25'] : colors.gray['900']};
`

const InnerContainer = styled.div`
  display: flex;
  ${utils.fullWidthContainer};
  justify-content: flex-start;
  padding-top: 100px;
  padding-bottom: 100px;
  gap: 40px;

  @media (max-width: 768px) {
    padding-top: 64px;
    padding-bottom: 0;
    gap: 64px;
    flex-direction: column;
    align-items: stretch;
  }
`

const Content = styled.div`
  max-width: 768px;
`

const Subheader = styled.span`
  color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['700'] : colors[primaryColorKey]['300']};
  ${typography.weights.semibold}
  ${typography.styles.textMd}
  display: block;
`
const HeaderTitle = styled.div`
  margin-top:12px;
  color: ${props => props.theme.color};
  ${typography.styles.displayLg}
  ${typography.weights.semibold}
  
  @media (max-width: 768px) {
    ${typography.styles.displayMd};
    ${typography.weights.semibold}
  }
`

const HeaderContent = styled.p`
  margin-top: 24px;
  color: ${props => props.theme.secondaryColor};
  ${typography.styles.textXl}
  ${typography.weights.regular}
  
  @media (max-width: 768px) {
    margin-top: 16px;
    ${typography.styles.textLg};
    ${typography.weights.regular}
  }
`

const ImageContainer = styled.div`
  text-align: center;
  height: 314px;
  flex: 1 0 auto;

  @media (max-width: 768px) {
    margin-left: -16px;
    margin-right: -16px;
    height: 320px;
  }

  img {
    object-fit: contain;
  }
`

export { Hero }
