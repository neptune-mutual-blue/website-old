import { useRef } from 'react'

import Slider from 'react-slick'
import styled from 'styled-components'
import { otherPartners } from './data'

export const BrandCarousel = () => {
  const sliderRef = useRef(null)

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    adaptiveHeight: false,
    swipeToSlide: true,
    // centerMode: true,
    variableWidth: true
  }

  return (
    <LogosContainer>
      <Slider
        ref={sliderRef}
        {...settings}
      >

        {otherPartners.map((partner, idx) => {
          return (
            <div key={idx}>
              <ImageContainer>
                <ImageBackground position={partner.position} width={partner.width} height={partner.height} title={partner.name} />
                {/* <img src={partner.imgSrc} alt={partner.name} width={230} height={64} loading='lazy' /> */}
              </ImageContainer>
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
    align-items: center;
  }

  .slick-list {
    margin: 0 -16px;
  }
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: 32px;
  padding-right: 32px;
`

const ImageBackground = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background: url('assets/images/partners/partners_sprite.webp') ${props => props.position};
  filter: ${props => props.theme.isLightMode ? 'inherit' : 'invert(100%)'};
`
