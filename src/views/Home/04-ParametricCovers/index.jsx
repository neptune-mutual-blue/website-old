import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { Features } from './Features'

export const ParametricCovers = () => {
  const { t } = useTranslation('home')

  return (
    <Container>
      <InnerContainer>
        <TextContainer>
          <H2>
            <Subheading>{t('Reduce your exposure to crypto market risks')}</Subheading>
            <Heading>{t('Decentralized Parametric Insurance')}</Heading>
          </H2>
          <SupportingText>{t('Neptune Mutual Protocol offers a couple of different flavors of decentralized parametric insurances.')}</SupportingText>
        </TextContainer>

        <Features />
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

  display: flex;
  flex-direction: column;
  gap: 64px;

  @media (max-width: 768px) {
    gap: 48px;
  }
`

const TextContainer = styled.div`
  max-width: 768px;
`

const Subheading = styled.div`
  color: ${(props) =>
     props.theme.isLightMode
      ? colors[primaryColorKey]['700']
      : colors[primaryColorKey]['500']};

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
