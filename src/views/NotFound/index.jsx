import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import {
  colors,
  primaryColorKey
} from '../../../styles/colors'
import { typography } from '../../../styles/typography'
import { utils } from '../../../styles/utils'
import { Button } from '../../components/Button'

export const NotFound = () => {
  const { t } = useTranslation('404')

  return (
    <Container>

      <TextAndCta>

        <H1 id='somethings-gone-missing'>
          <Subheading>{t('404 Error')}</Subheading>
          <Heading>{t('Something’s gone missing...')}</Heading>
        </H1>
        <Subtitle>
          {t("Sorry, the page you are looking for doesn't exist or has been moved.")}
        </Subtitle>

        <ButtonContainer>
          <Button
            href='/'
            as={Link}
            hierarchy='primary'
            size='2xl'
            iconTrailing
            iconVariant='arrow-narrow-right'
          >
            {t('Take me to homepage')}
          </Button>
        </ButtonContainer>
      </TextAndCta>

      <ImageContainer>
        <img
          src='/assets/images/hero/not-found-alert.webp'
          alt='A 404 Not Found Image Showing a Three-Dimensional Traffic Cone'
          loading='eager'
        />
      </ImageContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32px;
  padding-top: 64px;
  padding-bottom: 96px;

  ${utils.fullWidthContainer};

  @media (max-width: 768px) {
    padding-top: 64px;
    padding-bottom: 64px;
    flex-direction: column;
    align-items: stretch;
  }
`

const TextAndCta = styled.div`
  flex: 1;
`

const H1 = styled.h1``

const Heading = styled.div`
  margin-top: 16px;
  ${typography.styles.displayXL};
  ${typography.weights.semibold};

  @media (max-width: 768px) {
    margin-top: 12px;
    ${typography.styles.displayMd};
    ${typography.weights.semibold};
  }
`

const Subheading = styled.div`
  color: ${(props) => props.theme.isLightMode ? colors[primaryColorKey]['700'] : colors[primaryColorKey]['300']};

  ${typography.styles.textMd};
  ${typography.weights.semibold};

  @media (max-width: 768px) {
    ${typography.styles.textSm};
  }
`

const Subtitle = styled.p`
  margin-top: 24px;
  color: ${(props) => props.theme.secondaryColor};
  ${typography.styles.textXl};
  ${typography.weights.regular};

  @media (max-width: 768px) {
    margin-top: 16px;
    ${typography.styles.textLg};
    ${typography.weights.regular};
  }
`

const ButtonContainer = styled.div`
  margin-top: 48px;
  display: inline-flex;

  @media (max-width: 768px) {
    margin-top: 32px;
    display: block;
  }
`

const ImageContainer = styled.div`
  flex: 1;
  height: 560px;
  max-width: 100%;

  img {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    flex: 1 0 240px;
    height: 240px;
  }
`
