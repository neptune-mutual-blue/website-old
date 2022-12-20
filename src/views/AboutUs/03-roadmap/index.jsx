import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { MainCarousel } from './MainCarousel'

export const Roadmap = () => {
  const { t } = useTranslation('about')

  return (
    <Container>
      <InnerContainer>

        <TextContainer>
          <H2>
            <Subheading>
              <Trans t={t}>
                Roadmap
              </Trans>
            </Subheading>
            <Heading>
              <Trans t={t}>
                Follow Our Story. Join Our Community.
              </Trans>
            </Heading>
          </H2>
          <SupportingText>
            <Trans t={t}>
              Our roadmap for growing the Neptune Mutual Ecosystem.
            </Trans>
          </SupportingText>
        </TextContainer>

        <MainCarousel />
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
  margin-left: auto;
  margin-right: auto;
  text-align: center;
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
