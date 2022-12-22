import styled from 'styled-components'
import { ArticleCard } from '../../../components/ArticleCard'

export const CSSCarousel = ({ posts = [] }) => {
  return (
    <Container>
      {posts.map(post => {
        return (
          <PostContainer key={post.id}>
            <ArticleCard post={post} />
          </PostContainer>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
`

const PostContainer = styled.div`
  --cardCount: 3;
  --peek: 36px;
  --gutter: 1.5rem;
  scroll-snap-align: start;
  flex-shrink: 0;
  width: 33%;
  height: 100%;
  width: calc(100%/var(--cardCount) - (var(--peek)/var(--cardCount)) * 2 - (var(--gutter) / 2));
  margin: 0 calc(var(--gutter) / 2);

  @media (max-width: 768px) {
    --cardCount: 1;
  }
`
