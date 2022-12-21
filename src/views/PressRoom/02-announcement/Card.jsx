import Link from 'next/link'
import styled from 'styled-components'

import { colors, primaryColorKey } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { getFormattedDate } from '../../../helpers'

const Card = (props) => {
  return (
    <Container>
      <ImageContainer>
        <img
          src={props.post.image}
          alt={props.post.title.toLowerCase() === props.post.alt.toLowerCase() ? '' : props.post.alt}
        />
      </ImageContainer>

      <Time itemProp='published' dateTime={props.post.date}>{getFormattedDate(new Date(props.post.date).toUTCString())}</Time>

      <TitleContainer href={`/pressroom/${props.post.slug}`}>
        <Title>{props.post.title}</Title>
      </TitleContainer>

      <CardText>{props.post.intro}</CardText>

      <CardTags>
        <Tag color={props.post.tags[0].color} href={`/pressroom/tag/${props.post.tags[0].slug}`}>{props.post.tags[0].name}</Tag>
      </CardTags>

    </Container>
  )
}

const Container = styled.div`
  @media (max-width: 1280px) {
    width: auto;
  }


`

const ImageContainer = styled.div`
  position: relative;
  height: 333px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) { 
    height: 200px;
  }
`

const Time = styled.time`
  display: block;
  margin-top: 32px;
  color: ${props => props.theme.isLightMode ? colors.gray[500] : colors.gray[400]};
  ${typography.weights.semibold}
  ${typography.styles.textSm}

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`

const TitleContainer = styled(Link)``

const Title = styled.h3`
  margin-top: 8px;
  display: block;
  color: ${props => props.theme.isLightMode ? colors.gray[900] : colors.white};
  ${typography.weights.semibold}
  ${typography.styles.displayXs}
  cursor: pointer;
  

  @media (max-width: 768px) {
    ${typography.styles.textXl}
  }
`

const CardText = styled.p`
  color: ${props => props.theme.isLightMode ? colors.gray[600] : colors.gray[25]};
  margin-top: 8px;
  ${typography.styles.textMd}
  ${typography.weights.regular}
`

const CardTags = styled.div`
  margin-top: 26px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`

const Tag = styled(Link)`
  display: inline-flex;
  padding: 2px 10px;
  border-radius: 9999px;
  background-color: ${props => props.theme.isLightMode ? colors[props.color || primaryColorKey]['50'] : colors.gray['700']};
  color: ${props => props.theme.isLightMode ? colors[props.color || primaryColorKey]['700'] : colors[props.color || primaryColorKey]['400']};

  min-width: 0;

  ${typography.styles.textSm};
  ${typography.weights.medium};
  ${utils.ellipsis};

  :hover, :active{
    background-color: ${props => props.theme.isLightMode ? colors[props.color || primaryColorKey]['50'] : colors.gray['700']};
  color: ${props => props.theme.isLightMode ? colors[props.color || primaryColorKey]['700'] : colors[props.color || primaryColorKey]['400']};
  }
`

export { Card }
