import styled from 'styled-components'

import { getSlug } from '../../../../services/helpers/slug'
import { colors } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { Icon } from '../../../components/Icon'
import { getFormattedDate } from '../../../helpers'

export const Hero = ({ title, createdAt, timeToRead, featuredImage }) => {
  return (
    <Container>
      <Header>
        <BlogInfoContainer>
          <Time itemProp='published' dateTime={createdAt}>{getFormattedDate(new Date(createdAt).toUTCString())}</Time>
          <Icon size={8} variant='dot' />
          <BlogInfo>{timeToRead} read</BlogInfo>
        </BlogInfoContainer>
        <Heading id={getSlug(title)}>
          {title}
        </Heading>
      </Header>
      <ImageContainer>
        <img src={featuredImage} alt={title} loading='eager' />
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
    padding: 0;
    flex-direction: column-reverse;
    gap: 40px;
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
    margin: 0;
    padding: 0 16px;
    margin-bottom: 40px;
    ${typography.styles.displayMd};
  }
`

const BlogInfoContainer = styled.div`
  display: flex;
  align-items:center; 
  margin-bottom: 16px;
  gap: 8px; 

  @media (max-width: 768px) {
    padding: 0 16px;
    svg {
      display: none;
    }
  }
`

const BlogInfo = styled.span`
  ${typography.styles.textMd};
  ${typography.weights.semibold};
  color: ${props => props.theme.isLightMode ? colors.gray['500'] : colors.gray['200']};

  @media (max-width: 768px) {
    display: none;
  }
`

const ImageContainer = styled.div`
  flex: 1;
  height: 560px;
  max-width: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    flex: 1 0 240px;
    height: 240px;
    max-width: none;
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
