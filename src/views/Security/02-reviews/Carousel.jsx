import { useRef, useState } from 'react'
import styled from 'styled-components'
import SlickSlider from 'react-slick'

import { colors } from '../../../../styles/colors'
import { blurs } from '../../../../styles/blurs'
import { utils } from '../../../../styles/utils'
import { Icon } from '../../../components/Icon'
import { Card } from './Card'

const NextArrow = (props) => {
  return (
    <ArrowContainer {...props}>
      <span>Next</span>
      <Icon size={24} variant='arrow-right' />
    </ArrowContainer>
  )
}

const PrevArrow = (props) => {
  return (
    <ArrowContainer {...props}>
      <span>Previous</span>
      <Icon size={24} variant='arrow-left' />
    </ArrowContainer>
  )
}

const chunk = (array, size) => {
  if (!array) return []
  const firstChunk = array.slice(0, size) // create the first chunk of the given array
  if (!firstChunk.length) {
    return array // this is the base case to terminal the recursive
  }
  return [firstChunk].concat(chunk(array.slice(size, array.length), size))
}

const initialSlide = 0

const Carousel = (props) => {
  const sliderRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(initialSlide)
  const [isLast, setIsLast] = useState(0)

  const handleBeforeChange = (oldIndex, newIndex) => {
    // Hack to find if we are on last slide
    // This has few bugs, it's better dropping idea to disable the buttons and remove both states `currentIndex` and `isLast`
    if (oldIndex === newIndex) {
      setIsLast(true)
    } else {
      setIsLast(false)
    }
  }

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 2,
    rows: 1,
    centerMode: false,
    lazyLoad: true,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    beforeChange: handleBeforeChange,
    afterChange: setCurrentIndex,
    responsive: [
      {
        breakpoint: 1265,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }

  return (
    <Container>

      <SlickSlider
        ref={sliderRef}
        {...settings}
      >
        {props.audits.map((audit) => {
          return (
            <Card key={audit.id} audit={audit} />
          )
        })}
      </SlickSlider>

      {props.audits.length > 1 && (
        <Arrows>
          <PrevArrow onClick={() => { sliderRef.current.slickPrev() }} disabled={currentIndex === 0} />
          <NextArrow onClick={() => { sliderRef.current.slickNext() }} disabled={isLast} />
        </Arrows>
      )}

    </Container>
  )
}

const Container = styled.div`
  position: relative;
  max-width: 800px;

  .slick-track {
    display: flex !important;
  }

  .slick-list {
    margin: 0 -16px;
  }

  .slick-slide {
    margin: 0 16px;

    &[aria-hidden="true"] {
      visibility: hidden;
      transition: visibility 0.3s 1s linear;
    }
  }

  // @media (max-width: 1265px) {
  //   width: 400px;
  // }
`
const ArrowContainer = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
  width: 56px;
  height: 56px;
  cursor: pointer;

  background-color: ${props => props.theme.isLightMode ? colors.white : colors.gray['700']};
  color: ${props => props.theme.isLightMode ? colors.gray['500'] : colors.gray['50']};
  border: 1px solid ${props => props.theme.isLightMode ? colors.gray['200'] : colors.gray['600']};
  backdrop-filter: ${blurs.sm};
  border-radius: 50%;

  :not(:disabled):hover {
    background-color: ${props => props.theme.isLightMode ? colors.gray['50'] : colors.gray['600']};
    color: ${props => props.theme.isLightMode ? colors.gray['700'] : colors.white};
  }

  :disabled {
    border: 1px solid ${props => props.theme.isLightMode ? colors.gray['100'] : colors.gray['600']};
    color: ${props => props.theme.isLightMode ? colors.gray['300'] : colors.gray['600']};
  }

  > span {
    ${utils.srOnly};
  }
`

const Arrows = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 32px;
  justify-content: end;
`

export { Carousel }
