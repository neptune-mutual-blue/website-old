import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components'
import { colors } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { BrandCarousel } from './Brand-Carousel'

const fenbushiImgLight = '/assets/images/partners/fenbushi-capital.webp'
const animocaLight = '/assets/images/partners/animoca-brands.webp'
const fenbushiImgDark = '/assets/images/partners/darkmode/fenbushi-capital.webp'
const animocaDark = '/assets/images/partners/darkmode/animoca-brands.webp'

const partnersDark = [
  {
    name: 'Fenbushi Capital',
    imgSrc: fenbushiImgDark
  },
  {
    name: 'Animoca Brands',
    imgSrc: animocaDark
  }
]
const partnersLight = [
  {
    name: 'Fenbushi Capital',
    imgSrc: fenbushiImgLight
  },
  {
    name: 'Animoca Brands',
    imgSrc: animocaLight
  }
]

export const Partners = () => {
  const { t } = useTranslation('home')

  const { isLightMode } = useTheme()

  return (
    <Container>
      <InnerContainer>
        <Heading>{t('Powered by You, Trusted by Industry Leaders')}</Heading>
        <FeaturedPartners>
          {(isLightMode ? partnersLight : partnersDark).map((partner, ind) => (
            <img key={ind} src={partner.imgSrc} alt={partner.name} height={100} width={300} loading='lazy' />
          ))}
        </FeaturedPartners>
        <BrandCarousel />
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  padding-top: 96px;
  padding-bottom: 96px;
  background-color: ${(props) => props.theme.isLightMode ? colors.gray['50'] : colors.gray['700']};

  @media (max-width: 768px) {
    padding-top: 64px;
    padding-bottom: 64px;
  }
`

const InnerContainer = styled.div`
  ${utils.fullWidthContainer};
`

const Heading = styled.h2`
  color: ${(props) => props.theme.color};
  text-align: center;

  ${typography.styles.displayMd};
  ${typography.weights.semibold};

  @media (max-width: 768px) {
    ${typography.styles.displaySm};
    ${typography.weights.semibold};
  }
`

const FeaturedPartners = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap:64px;
  margin-top: 64px;
  justify-content: center;
  align-items: center;

  & img:first-child, & img:last-child {
    height: 100px;
    object-fit: contain;
  }
`
