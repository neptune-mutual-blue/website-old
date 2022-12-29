import {
  useRef,
  useState
} from 'react'

import Slider from 'react-slick'
import styled from 'styled-components'

import {
  colors,
  primaryColorKey
} from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { Icon } from '../../../components/Icon'
import { useMediaQuery } from '../../../hooks/useMediaQuery'

import { data } from './data'

const [founder1, founder2, founder3, ...others] = data

const desktopSlides = [founder1, founder2, founder3, ...others]
const tabletSlides = [founder1, founder3, ...others, founder2]
const mobileSlides = [founder1, founder2, founder3, ...others]

const Details = ({ id, name, title, links, isMobile }) => (
  <DetailsContainer data-is-mobile={isMobile ? 'true' : 'false'}>
    <Name id={id}>{name}</Name>
    <Title>{title}</Title>

    <LinksContainer>
      {
        links.linkedIn && (
          <a href={links.linkedIn} title={`${name} LinkedIn`} target='_blank' rel='nofollow noreferrer'>
            <Icon variant='linkedin' size={16} />
          </a>
        )
      }
      {
        links.twitter && (
          <a href={links.twitter} target='_blank' title={`${name} Twitter`} rel='nofollow noreferrer'>
            <Icon variant='twitter' size={16} />
          </a>
        )
      }
      {
        links.medium && (
          <a href={links.medium} target='_blank' title={`${name} Medium`} rel='nofollow noreferrer'>
            <Icon variant='medium' size={16} />
          </a>
        )
      }
      {
        links.facebook && (
          <a href={links.facebook} target='_blank' title={`${name} Facebook`} rel='nofollow noreferrer'>
            <Icon variant='facebook' size={16} />
          </a>
        )
      }
    </LinksContainer>
  </DetailsContainer>
)

const TeamSliderItem = ({ team }) => {
  const { imgSrc, name, title, links, id } = team

  return (
    <ItemContainer>
      <img src={imgSrc} aria-labelledby={id} />
      <Details id={id} name={name} title={title} links={links} />
    </ItemContainer>
  )
}

const INITIAL_SLIDE = 0
export const TeamCarousel = () => {
  const sliderRef = useRef(null)
  const isLessThan768 = useMediaQuery('(max-width: 768px)')
  const isLessThan425 = useMediaQuery('(max-width: 425px)')
  const [currentSlide, setCurrentSlide] = useState(INITIAL_SLIDE)

  const handleAfterChange = i => {
    setCurrentSlide(i)
  }

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    // adaptiveHeight: true,
    initialSlide: INITIAL_SLIDE,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    afterChange: handleAfterChange,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          centerMode: true,
          centerPadding: '0',
          slidesToScroll: 3,
          slidesToShow: 3,
          swipeToSlide: true
        }
      },
      {
        breakpoint: 425,
        settings: {
          centerMode: true,
          centerPadding: '0',
          slidesToScroll: 1,
          slidesToShow: 1,
          swipeToSlide: true
        }
      }
    ]
  }

  const handleArrowClick = dir => {
    if (dir === 'left') {
      sliderRef.current.slickPrev()
    }

    if (dir === 'right') {
      sliderRef.current.slickNext()
    }
  }

  let currentSlidesData = desktopSlides

  if (isLessThan768 && !isLessThan425) {
    currentSlidesData = tabletSlides
  } else if (isLessThan768 && isLessThan425) {
    currentSlidesData = mobileSlides
  }

  return (
    <Container>
      <Slider {...settings} ref={sliderRef}>
        {currentSlidesData.map((team, idx) => {
          return (
            <TeamSliderItem
              key={idx}
              team={team}
            />
          )
        })}
      </Slider>

      <MobileDetailsWrapper>
        <Details
          isMobile
          links={currentSlidesData[currentSlide].links}
          title={currentSlidesData[currentSlide].title}
          name={currentSlidesData[currentSlide].name}
        />
      </MobileDetailsWrapper>

      <ArrowsContainer>
        <ArrowButton
          title='Left'
          onClick={() => handleArrowClick('left')}
        >
          <Icon variant='arrow-left' size={24} />
        </ArrowButton>

        <ArrowButton
          title='Right'
          onClick={() => handleArrowClick('right')}
        >
          <Icon variant='arrow-right' size={24} />
        </ArrowButton>
      </ArrowsContainer>
    </Container>
  )
}

const Container = styled.div`
  & .slick-slide[aria-hidden="true"] {
    a {
      display: none;
    }

  }
  
  @media screen and (max-width: 768px) {
    & .slick-track {
      display: flex;
      align-items: center;
    }

    & .slick-slide {
      img {
        width: 89px;
        height: 89px;
      }
    }
    
    & .slick-current {
      img {
        width: 118px;
        height: 118px;
      }
    }
  }
`

const ItemContainer = styled.div`
  max-width: 300px;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  height: 100%;

  margin-left: auto;
  margin-right: auto;

  transition: all 5s;

  img {
    width: 100px;
    height: 100px;
  }

  @media screen and (max-width: 768px) {
    max-width: 118px;
  }
`

const DetailsContainer = styled.div`
  text-align: center;

  @media screen and (max-width: 768px) {
    &[data-is-mobile="false"] {
      display: none;
    }
  }
`

const Name = styled.p`
  ${typography.styles.textLg}
  ${typography.weights.semibold}
  color: ${props => props.theme.isLightMode ? colors[primaryColorKey][900] : colors.white};
  
  @media screen and (max-width: 768px) {
    ${typography.styles.textXl}
  }
`

const Title = styled.p`
  color: ${props => props.theme.isLightMode ? colors[primaryColorKey][700] : colors[primaryColorKey][300]};
  ${typography.styles.textMd}
  ${typography.weights.regular}
`

const LinksContainer = styled.div`
  margin-top: 16px;
  padding-bottom: 2px;
  display: flex;
  gap: 14px;
  justify-content: center;

  .slick-active[aria-hidden="true"] {
    a {
      display: none;
    }
  }

  a {
    display: flex;
    align-items: center;
  }

  svg {
    color: ${props => props.theme.isLightMode ? colors.gray[600] : colors.white};

    @media screen and (max-width: 768px) {
      width: 24px;
      height: 24px;
    }
  }
`

const ArrowsContainer = styled.div`
  margin-top: 64px;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  gap: 32px;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    margin-top: 48px;
  }
`

const ArrowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-radius: 9999px;
  border: 1px solid ${colors.gray[200]};
  cursor: pointer;

  @media screen and (max-width: 768px) {
    background-color: ${props => props.theme.isLightMode ? 'transparent' : colors.gray[700]};
  }

`

const MobileDetailsWrapper = styled.div`
  margin-top: 16px;
  min-height: 100px;

  @media screen and (min-width: 769px) {
    display: none;
  }
`
