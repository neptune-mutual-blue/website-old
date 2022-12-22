import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { colors } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'

import { CSSCarousel } from './CSSCarousel'

export const SecuringApps = () => {
  const { t } = useTranslation('home')

  return (
    <Container>
      <InnerContainer>
        <ContentContainer>
          <Heading>{t('Securing your favorite DeFi, CeFi, and Metaverse Apps')}</Heading>
          <CSSCarousel />
        </ContentContainer>
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  padding-top: 96px;
  padding-bottom: 96px;

  @media (max-width: 768px) {
    padding-top: 64px;
    padding-bottom: 64px;
  }
`

const InnerContainer = styled.div`
  ${utils.fullWidthContainer};

  @media (max-width: 768px) {
    padding-left: 0;
    padding-right: 0;
  }
`

const ContentContainer = styled.div`
  background-color: ${(props) => props.theme.isLightMode ? colors.gray['50'] : colors.gray['700']};
  padding: 64px;
  border-radius: 16px;

  @media (max-width: 768px) {
    padding: 48px 24px;
    border-radius: 0;
  }
`

const Heading = styled.p`
  color: ${(props) => props.theme.secondaryColor};
  text-align: center;
  margin-bottom: 32px;

  ${typography.styles.textXl};
  ${typography.weights.regular};

  @media (max-width: 768px) {
    ${typography.styles.textMd};
    ${typography.weights.medium};
  }
`
