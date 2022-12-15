import {
  useRef,
  useState
} from 'react'

import Slider from 'react-slick'
import styled from 'styled-components'

import { colors } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import {
  ArrowLeft,
  ArrowRight
} from '../../../components/Icon/variants/Arrows'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { NewsCard } from './NewsCard'

export const Media = ({ news }) => {
  const sliderRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1023px)')

  const handleArrowClick = dir => {
    if (dir === 'left') {
      sliderRef.current.slickPrev()
    }

    if (dir === 'right') {
      sliderRef.current.slickNext()
    }
  }

  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    // adaptiveHeight: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    afterChange: setCurrentSlide,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: false
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

  const prevButtonDisabled = currentSlide === 0
  const nextButtonDisabled = isMobile
    ? currentSlide === news.length - 1
    : isTablet
      ? currentSlide === news.length - 2
      : currentSlide === news.length - 3

  return (
    <Container>
      <InnerContainer>
        <Title>Neptune Mutual in the Media</Title>

        <SliderContainer>
          <Slider {...settings} ref={sliderRef}>
            {news.map((n) => {
              return (
                <SingleCard key={n.id}>
                  <NewsCard newsItem={n} />
                </SingleCard>
              )
            })}
          </Slider>
        </SliderContainer>
        <ArrowsContainer>
          <ArrowButton
            disabled={prevButtonDisabled}
            title='Left'
            onClick={() => handleArrowClick('left')}
          >
            <ArrowLeft width='24' height='24' />
          </ArrowButton>
          <ArrowButton
            disabled={nextButtonDisabled}
            title='Right'
            onClick={() => handleArrowClick('right')}
          >
            <ArrowRight width='24' height='24' />
          </ArrowButton>
        </ArrowsContainer>
      </InnerContainer>

    </Container>
  )
}

const Container = styled.div`
  ${utils.fullWidthContainer}
`

const InnerContainer = styled.div`
  padding: 32px 0 96px 0;
  border-top: 1px solid ${props => props.theme.isLightMode ? colors.gray[300] : colors.gray[700]};
`

const Title = styled.h2`
  ${typography.styles.displayXs}
  ${typography.weights.semibold}
`

const SliderContainer = styled.div`
  margin-top: 32px;

  .slick-track {
    display: flex;
  }

  .slick-list {
    margin: 0 -16px;
  }

  .slick-slide {
    margin: 0 16px;
  }
`

const SingleCard = styled.div`
  flex: 1 1 30%;
`

const ArrowsContainer = styled.div`
  margin-top: 64px;

  display: flex;
  gap: 36px;
  justify-content: flex-end;
  align-items: center;
  
  @media screen and (max-width: 768px) {
    justify-content: center;
    margin-top: 48px;
  }
`

const ArrowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-radius: 9999px;
  cursor: pointer;
  border: 1px solid ${props => props.theme.isLightMode ? colors.gray[200] : colors.gray[600]};
  background-color: ${props => props.theme.isLightMode ? colors.white : colors.gray[700]};
  
  &:disabled {
    cursor: default;
    border: 1px solid ${props => props.theme.isLightMode ? colors.gray[100] : colors.gray[600]};
    opacity: ${props => props.theme.isLightMode ? 1 : 0.5};
  }
  
`
