import Image from 'next/image'
import styled from 'styled-components'

import { colors } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { Icon } from '../../../components/Icon'
import { getFormattedDate } from '../../../helpers'
import { getBlurDataURL } from '../../../helpers/images'

export const BlogHero = ({ title, createdAt, timeToRead, featuredImage, alt }) => {
  return (
    <Container>
      <Header>
        <BlogInfoContainer>
          <Time itemprop='published' datetime={createdAt}>{getFormattedDate(new Date(createdAt).toString())}</Time>
          <Icon size={8} variant='dot' />
          <BlogInfo>{timeToRead} read</BlogInfo>
        </BlogInfoContainer>
        <Heading>
          {title}
        </Heading>
      </Header>
      <ImageContainer>
        <Image
          src={`${featuredImage}`}
          fill
          loading='eager'
          priority
          sizes='(max-width: 768px) 80vw, (max-width: 1280px) 40vw, 640px'
          placeholder='blur'
          blurDataURL={getBlurDataURL(1280, 1280)}
          alt={alt}
        />
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
    padding-bottom: 32px;
    ${typography.styles.displayMd};
  }
`

const BlogInfoContainer = styled.div`
  display: flex;
  align-items:center; 
  margin-bottom: 16px;
  gap: 8px; 

  @media (max-width: 768px) {
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
  position: relative;

  @media (max-width: 768px) {
    flex: 1 0 240px;
    height: 240px;
    max-width: none;
  }

  img {
    object-fit: cover;
    display: block;
  }
`

const Time = styled.time`
  display: inline-block;
  ${typography.styles.textMd};
  ${typography.weights.semibold};
  color: ${props => props.theme.isLightMode ? colors.gray['500'] : colors.gray['200']};

  @media (max-width: 768px) {
    display: none;
  }
`
