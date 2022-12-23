import { useRef } from 'react'

import Slider from 'react-slick'
import styled from 'styled-components'
import { sizes, otherPartners } from './data'

export const BrandCarousel = () => {
  const sliderRef = useRef(null)

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
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
        breakpoint: 1365,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  }

  return (
    <LogosContainer>
      <Slider
        ref={sliderRef}
        {...settings}
      >

        {otherPartners.map((partner, idx) => {
          return (
            <ImageContainer key={idx} position={partner.position}>
              {/* <img src={partner.imgSrc} alt={partner.name} width={230} height={64} loading='lazy' /> */}
            </ImageContainer>
          )
        })}
      </Slider>
    </LogosContainer>
  )
}

const LogosContainer = styled.div`
  margin-top:64px;
  display:flex;
  gap:14px;
  flex-wrap: wrap;
  width: 100%;

  .slick-slider{
    width:100%;
  }

  .slick-track {
    display: flex !important;
  }

  .slick-list {
    margin: 0 -16px;
  }

  .slick-slide img{
    object-fit: contain;
  }
`

const ImageContainer = styled.div`
  width: ${sizes.width}px;
  height: ${sizes.height}px;
  background: url('assets/images/partners/partners_sprite.webp') ${props => props.position};
  filter: ${props => props.theme.isLightMode ? 'inherit' : 'invert(100%)'};
`
