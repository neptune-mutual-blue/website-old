import styled from 'styled-components'
import { colors } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { getFormattedDate } from '../../../utils'

export const BlogHero = ({ title, createdAt, timeToRead, featuredImage }) => {
  return (
    <Container>
      <Header>
        <BlogInfoContainer>
          <Time itemprop='published' datetime={createdAt}>{getFormattedDate(new Date(createdAt).toString())}</Time>
          •
          <BlogInfo>{timeToRead} read</BlogInfo>
        </BlogInfoContainer>
        <Heading>
          {title}
        </Heading>
      </Header>
      <ImageContainer>
        <img src={`/${featuredImage}`} alt='Neptune' />
      </ImageContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32px;
  padding-top: 64px;
  padding-bottom: 96px;

  ${utils.fullWidthContainer};

  @media (max-width: 768px) {
    padding-top: 64px;
    padding-bottom: 64px;
    flex-direction: column;
    align-items: stretch;
  }
`

const Header = styled.div`
  flex: 1;
`

const Heading = styled.h1`
  margin-top: 16px;
  ${typography.styles.displayXL};
  ${typography.weights.semibold};

  @media (max-width: 768px) {
    ${typography.styles.displayMd};
    ${typography.weights.semibold};
  }
`

const BlogInfoContainer = styled.div`
  display: flex;
  align-items:center; 
  margin-bottom: 16px;
  gap: 8px; 
  color: ${props => props.theme.isLightMode ? colors.gray['500'] : colors.gray['200']};
`

const BlogInfo = styled.p`
  ${typography.styles.textMd};
  ${typography.weights.semibold};
  color: ${props => props.theme.isLightMode ? colors.gray['500'] : colors.gray['200']};

  @media (max-width: 768px) {
    margin-bottom: 12px;
    ${typography.styles.textMd};
    ${typography.weights.semibold};
  }
`

const ImageContainer = styled.div`
  flex: 1;
  height: 560px;
  max-width: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 240px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const Time = styled.time`
  display: inline-block;
  ${typography.styles.textMd};
  ${typography.weights.semibold};
  color: ${props => props.theme.isLightMode ? colors.gray['500'] : colors.gray['200']};
`
