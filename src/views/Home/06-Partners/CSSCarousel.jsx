import styled, { useTheme } from 'styled-components'

import { carouselItemsInverted, carouselItemsLight } from './data'

export const CSSCarousel = () => {
  const { isLightMode } = useTheme()

  const slidesToMap = isLightMode ? carouselItemsLight : carouselItemsInverted

  return (
    <Container>
      {slidesToMap.map((brand, idx) => {
        return (
          <ImageContainer key={idx}>
            <img src={brand.imgSrc} alt={brand.name} width={200} height={64} loading='lazy' />
          </ImageContainer>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  margin-top: 64px;

  display: flex;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
`

const ImageContainer = styled.div`
  --cardCount: 4;
  --peek: 100px;
  --gutter: 1.5rem;
  scroll-snap-align: start;
  flex-shrink: 0;
  width: 33%;
  height: 100%;
  width: calc(100%/var(--cardCount) - (var(--peek)/var(--cardCount)) * 2 - (var(--gutter) / 2));
  margin: 0 calc(var(--gutter) / 2);

  display: inline-flex;
  align-items: center;
  justify-content: center;

  img {
    object-fit: contain;
  }

  @media (max-width: 1280px) {
    --cardCount: 3;
  }

  @media (max-width: 1024px) {
    --cardCount: 2;
  }

  @media (max-width: 768px) {
    --cardCount: 1;
  }
`
