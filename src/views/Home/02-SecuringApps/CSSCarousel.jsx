import styled from 'styled-components'
import { typography } from '../../../../styles/typography'

import { data } from './data'

export const CSSCarousel = () => {
  return (
    <Container>
      {data.map((app) => {
        return (
          <ImageContainer key={app.id}>
            {/* @note - alt is empty because the content of the image is already provided in context through text */}
            <img src={app.src} alt='' height='32' width='32' />
            <AppName>{app.name}</AppName>
          </ImageContainer>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
`

const ImageContainer = styled.div`
  --cardCount: 4;
  --peek: 80px;
  --gutter: 24px;
  scroll-snap-align: start;
  flex-shrink: 0;
  width: 33%;
  height: 100%;
  width: calc(100%/var(--cardCount) - (var(--peek)/var(--cardCount)) * 2 - (var(--gutter) / 2));
  margin: 0 calc(var(--gutter) / 2);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

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

const AppName = styled.span`
  color: ${(props) => props.theme.color};

  ${typography.styles.textXl};
  ${typography.weights.bold};
`
