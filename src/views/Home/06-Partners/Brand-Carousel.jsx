import { useRef } from 'react'

import Slider from 'react-slick'
import styled, { useTheme } from 'styled-components'
import { carouselItemsInverted, carouselItemsLight } from './data'

export const BrandCarousel = () => {
  const { isLightMode } = useTheme()

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

  const slidesToMap = isLightMode ? carouselItemsLight : carouselItemsInverted

  return (
    <LogosContainer>
      <Slider
        ref={sliderRef}
        {...settings}
      >

        {slidesToMap.map((brand, idx) => {
          return (
            <div key={idx}>
              <img src={brand.imgSrc} alt={brand.name} width={230} height={64} loading='lazy' />
            </div>
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
