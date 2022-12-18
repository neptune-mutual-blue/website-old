import styled from 'styled-components'
import { typography } from '../../../../styles/typography'
import { data } from './data'
import Slider from 'react-slick'
import Image from 'next/image'

const Carousel = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    autoplay: true,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    adaptiveWidth: true,
    swipeToSlide: true,
    variableWidth: false,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 1090,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }

  return (
    <Slider {...settings}>
      {data.map((app) => {
        return (
          <AppContainer key={app.id}>
            {/* @note - alt is empty because the content of the image is already provided in context through text */}
            <Image src={app.src} alt='' height='32' width='32' />
            <AppName>{app.name}</AppName>
          </AppContainer>
        )
      })}
    </Slider>
  )
}

const AppContainer = styled.div`
  display: flex !important;
  align-items: center;
  padding: 12px 12px;
  gap: 8px;
  margin-left: 24px;
  justify-content: center;

  &:nth-last-of-type(1) {
    margin-left: 0;
  }
`

const AppName = styled.span`
  color: ${(props) => props.theme.color};

  ${typography.styles.textXl};
  ${typography.weights.bold};
`

export { Carousel }
