import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { colors } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { BrandCarousel } from './Brand-Carousel'
import { featuredPartners } from './data'

export const Partners = () => {
  const { t } = useTranslation('home')

  return (
    <Container>
      <InnerContainer>
        <Heading>{t('Powered by You, Trusted by Industry Leaders')}</Heading>
        <FeaturedPartners>
          {featuredPartners.map((partner, ind) => (
            <ImageContainer key={ind} partner={partner} />
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

const ImageContainer = styled.div`
  width: ${props => props.partner.width}px;
  height: ${props => props.partner.height}px;
  background: url('assets/images/partners/feat_partners_sprite.png') ${props => props.partner.position};
  filter: ${props => props.theme.isLightMode ? 'inherit' : 'invert(100%)'};
`
