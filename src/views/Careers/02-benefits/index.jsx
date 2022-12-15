import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import {
  colors,
  primaryColorKey
} from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { Features } from './Features'

export const Benefits = () => {
  const { t } = useTranslation('careers')

  return (
    <Container>
      <InnerContainer>
        <TextContainer>
          <H2>
            <Subheading>{t('Work together with the brightest minds in decentralized insurance space')}</Subheading>
            <Heading>{t('Why should you apply for a position at Neptune Mutual?')}</Heading>
          </H2>
          <SupportingText>{t('Inspiring unity and cooperation, our common principles serve as the bedrock of our company culture.')}</SupportingText>
        </TextContainer>

        <Features />

      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  padding-top: 56px;
  padding-bottom: 96px;

  @media (max-width: 768px) {
    padding-top: 64px;
    padding-bottom: 64px;
  }
`

const InnerContainer = styled.div`
  ${utils.fullWidthContainer};
`

const TextContainer = styled.div`
  max-width: 768px;
`

const Subheading = styled.div`
  color: ${(props) => props.theme.isLightMode ? colors[primaryColorKey]['700'] : colors[primaryColorKey]['300']};

  ${typography.styles.textMd};
  ${typography.weights.semibold};

  @media (max-width: 768px) {
    ${typography.styles.textSm};
  }
`
const H2 = styled.h2``
const Heading = styled.div`
  margin-top: 12px;
  color: ${(props) => props.theme.color};

  ${typography.styles.displayMd};
  ${typography.weights.semibold};

  @media (max-width: 768px) {
    ${typography.styles.displaySm};
    ${typography.weights.semibold};
  }
`

const SupportingText = styled.p`
  margin-top: 20px;
  color: ${(props) => props.theme.secondaryColor};

  ${typography.styles.textXl};
  ${typography.weights.regular};

  @media (max-width: 768px) {
    margin-top: 16px;
    ${typography.styles.textLg};
    ${typography.weights.regular};
  }
`
