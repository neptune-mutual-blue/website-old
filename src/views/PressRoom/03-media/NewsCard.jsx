import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { getFormattedDate } from '../../../helpers'
import { getBlurDataURL } from '../../../helpers/images'

export const NewsCard = ({ newsItem }) => {
  return (
    <Container href={newsItem.link} target='_blank' rel='noreferrer nofollow'>
      <ImageContainer>
        <Image
          src={`${newsItem.image}`}
          alt={newsItem.alt}
          fill
          sizes='(max-width: 768px) 80vw, (max-width: 1280px) 40vw, 420px'
          placeholder='blur'
          blurDataURL={getBlurDataURL(800, 450)}
        />
      </ImageContainer>

      <Time itemprop='published' datetime={newsItem.date}>{getFormattedDate(new Date(newsItem.date).toString())}</Time>

      <Title>{newsItem.title}</Title>

      <TagsContainer>
        <Tag tag={{ color: newsItem.press.badge }}>
          {newsItem.press.name}
        </Tag>
      </TagsContainer>
    </Container>
  )
}

const Container = styled(Link)`
  display: block;
  text-align: left;
`

const ImageContainer = styled.div`
  position: relative;
  height: 240px;

  img {
    object-fit: cover;
  }
`

const Time = styled.time`
  display: inline-block;
  margin-top: 32px;
  ${typography.styles.textSm};
  ${typography.weights.semibold};
  color: ${props => props.theme.isLightMode ? colors.gray['500'] : colors.gray['200']};
`

const Title = styled.h3`
  margin-top: 8px;
  color: ${props => props.theme.color};
  ${typography.styles.displayXs};
  ${typography.weights.medium};

  --max-lines: 3;
  ${utils.maxLines};
`

const TagsContainer = styled.div`
  margin-top: 24px;

  display: flex;
  flex-wrap: wrap;
`

export const Tag = styled.div`
  display: inline-flex;
  padding: 2px 10px;
  border-radius: 9999px;
  background-color: ${props => props.theme.isLightMode ? colors[props.tag.color || primaryColorKey]['50'] : colors.gray['700']};
  color: ${props => props.theme.isLightMode ? colors[props.tag.color || primaryColorKey]['700'] : colors[props.tag.color || primaryColorKey]['400']};

  min-width: 0;

  ${typography.styles.textSm};
  ${typography.weights.medium};
  ${utils.ellipsis};
`
