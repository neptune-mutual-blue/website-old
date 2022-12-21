import Link from 'next/link'
import styled from 'styled-components'
import { colors } from '../../styles/colors'
import { typography } from '../../styles/typography'
import { utils } from '../../styles/utils'
import { getFormattedDate } from '../helpers'
import { Tag } from './Tag'

export const ArticleCard = ({ post, type = 'blog' }) => {
  return (
    <Container>
      <ImageContainer>
        <img
          src={`${post.image}`}
          alt={post.alt.toLowerCase() === post.title.toLowerCase() ? '' : post.alt}
          loading='lazy'
        />
      </ImageContainer>

      <Time itemProp='published' dateTime={post.date}>{getFormattedDate(new Date(post.date).toUTCString())}</Time>

      <TitleContainer href={`/${type}/${post.slug}`}>
        <Title>{post.title}</Title>
      </TitleContainer>

      <Intro>{post.intro}&hellip;</Intro>

      <TagsContainer>
        {post.tags.slice(0, 1).map((tag) => (
          <Tag key={tag.name} color={tag.color} href={`/${type}/tag/${tag.slug}`}>{tag.name}</Tag>
        ))}
      </TagsContainer>
    </Container>
  )
}

const Container = styled.div`
  display: block;
  text-align: left;
`

const ImageContainer = styled.div`
  height: 240px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Time = styled.time`
  display: inline-block;
  margin-top: 32px;
  ${typography.styles.textSm};
  ${typography.weights.semibold};
  color: ${props => props.theme.isLightMode ? colors.gray['500'] : colors.gray['200']};

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`

const TitleContainer = styled(Link)``

const Title = styled.h3`
  margin-top: 8px;
  color: ${props => props.theme.color};
  ${typography.styles.displayXs};
  ${typography.weights.medium};

  --max-lines: 2;
  ${utils.maxLines};
`

const Intro = styled.p`
  margin-top: 8px;
  color: ${props => props.theme.secondaryColor};
  ${typography.styles.textMd};
  ${typography.weights.regular};

  --max-lines: 2;
  ${utils.maxLines};
`

const TagsContainer = styled.div`
  margin-top: 24px;

  display: flex;
  flex-wrap: wrap;
`
