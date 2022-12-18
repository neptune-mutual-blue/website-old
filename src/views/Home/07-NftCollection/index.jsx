import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import {
  colors,
  primaryColorKey
} from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { Button } from '../../../components/Button'
import { getBlurDataURL } from '../../../helpers/images'

export const NftCollection = () => {
  const { t } = useTranslation('home')

  return (
    <Container>
      <InnerContainer>
        <TextAndCta>
          <TextContainer>
            <H2>
              <Subheading>{t('Coming Soon')}</Subheading>
              <Heading>{t('NFT Series Collection')}</Heading>
            </H2>
            <SupportingText>{t('We are developing an amazing collection of NFTs for our community. You can expect both tradeable and soulbound versions, some of which may have an economic benefit and utility within the marketplace. Be sure to join our Discord community to keep up to date with our NFT news.')}</SupportingText>
          </TextContainer>

          <Button
            href='https://discord.gg/2qMGTtJtnW'
            as='a'
            hierarchy='primary'
            size='xl'
            iconTrailing
            iconVariant='discord'
          >
            {t('Join Our Discord')}
          </Button>
        </TextAndCta>

        <ImageContainer>
          <Image
            src='/assets/images/nft/promo.webp'
            alt='A banner that displays an NFT set, consisting of cards featuring unique Neptune Mutual NFT character portraits, names, and descriptions.'
            fill
            sizes='(max-width: 768px) 100vw, 1280px'
            placeholder='blur'
            blurDataURL={getBlurDataURL(1280, 720)}
          />
        </ImageContainer>
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  padding-top: 120px;
  padding-bottom: 144px;

  @media (max-width: 768px) {
    padding-top: 64px;
    padding-bottom: 64px;
  }
`

const InnerContainer = styled.div`
  ${utils.fullWidthContainer};
`

const TextAndCta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
`

const TextContainer = styled.div`
  text-align: center;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
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

const ImageContainer = styled.div`
  position: relative;
  margin-top: 64px;
  height: 480px;
  border-radius: 16px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 360px;
    border-radius: 0px;
    max-width: none;
    margin-left: -16px;
    margin-right: -16px;
  }

  img {
    object-fit: cover;
  }
`
