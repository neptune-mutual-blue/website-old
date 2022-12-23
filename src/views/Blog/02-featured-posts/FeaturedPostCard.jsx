import Link from 'next/link'
import styled from 'styled-components'

import {
  colors
} from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { Tag } from '../../../components/Tag'
import { getFormattedDate } from '../../../helpers'

export const FeaturedPostCard = ({ post }) => {
  return (
    <Container>
      <ImageContainer>
        <img
          src={`${post.image}`} height={200} width={320}
          alt={post.title.toLowerCase() === post.alt.toLowerCase() ? '' : post?.alt || ''}
          loading='lazy'
        />
      </ImageContainer>

      <Contents>
        <Time itemProp='published' dateTime={post.date}>{getFormattedDate(new Date(post.date).toString())}</Time>

        <Link href={`/blog/${post.slug}`}>
          <Title>{post.title}</Title>
        </Link>

        <Intro>{post.intro}&hellip;</Intro>

        <TagsContainer>
          {post.tags.slice(0, 1).map((tag) => (
            <Tag key={tag.name} color={tag.color} href={`/blog/tag/${tag.slug}`}>{tag.name}</Tag>
          ))}
        </TagsContainer>
      </Contents>
    </Container>
  )
}

const Container = styled.div`
  --max-lines: 1;
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: flex-start;

  &:not(:nth-of-type(1)) {
    @media (min-width: 1024px) {
      height: 200px;
    }
  }
  
  &:nth-of-type(1) {
    @media (min-width: 1024px) {
      grid-row-start: 1;
      grid-row-end: 3;
      
      flex-direction: column;
      gap: 32px;
      
      --max-lines: 2;
    }

    img {
      height: 240px;
    }
  }
  
  // if not first child, then change font style for <Title> component
  &:not(:nth-of-type(1)) > div:nth-of-type(2) h3 {
    ${typography.styles.textLg};

  }
  &:not(:nth-of-type(1)) > div:nth-of-type(2) > p,
  &:not(:nth-of-type(1)) > div:nth-of-type(2) h3 {
    @media (min-width: 1024px) {
      width: 250px;
    }

  }
  
  @media (max-width: 1023px) {
    // change font style of <Title> component of 2nd/3rd children
    & > div:nth-of-type(2) h3 {
      ${typography.styles.textLg};
    }
  }
  
  // if screen size is below 768px
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;

    --max-lines: 2;
  }

  // change <TagsContainer> style for first child
  &:nth-of-type(1) > div:nth-of-type(2) > div:last-of-type {
    margin-bottom: 0px;
    margin-top: 24px;
  }

`

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (max-width: 860px) {
    height: auto;
  }
`

const ImageContainer = styled.div`
  position: relative;
  min-height: 200px;
  width: 320px;

  @media (max-width: 1024px) {
    width: auto;
  }
  
  ${Container}:nth-of-type(1) > & {
    height: 240px;
    width: 592px;
    
    @media (max-width: 1280px) {
      width: 100%;
    }

    @media (max-width: 1024px) {
      width: auto;
    }
  }
  
  img {
    object-fit: cover;
    width: 100%;

    @media (max-width: 1024px) {
        height: 240px !important;
    }
  }  
`

const Time = styled.time`
  display: inline-block;
  ${typography.styles.textSm};
  ${typography.weights.semibold};
  color: ${props => props.theme.isLightMode ? colors.gray['500'] : colors.gray['200']};
`

const Title = styled.h3`
  margin-top: 8px;
  color: ${props => props.theme.color};
  ${typography.styles.displayXs};
  ${typography.weights.semibold};
`

const Intro = styled.p`
  margin-top: 8px;
  color: ${props => props.theme.secondaryColor};
  ${typography.styles.textSm};
  ${typography.weights.regular};
  
  --max-lines: 2;
  ${utils.maxLines};
`

const TagsContainer = styled.div`
  margin-top: 24px;

  display: flex;
  flex-wrap: wrap;
`
