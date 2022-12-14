import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { Icon } from '../../../components/Icon'
import { useVideosContext } from '../../../context/VideosContext'
import { Video } from './Video'

export const RecentVideos = () => {
  const { videos } = useVideosContext()

  return (
    <Container>
      <InnerContainer>
        <HeadingContainer>
          <Heading>Recent Videos</Heading>
          <ExternalLink href='https://youtube.com/neptune-mutual' rel='noreferrer' target='_blank'>View All Videos <Icon size={20} variant='link-external-01' /></ExternalLink>
        </HeadingContainer>

        <VideosContainer>
          {videos && videos.map((video, idx) => {
            return <Video key={idx} video={video} />
          })}
        </VideosContainer>
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  ${utils.fullWidthContainer};
`

const InnerContainer = styled.div`
  border-top: 1px solid ${props => props.theme.isLightMode ? colors.gray['300'] : colors.gray['700']};

  padding-top: 56px;
  padding-bottom: 56px;
  
  @media (max-width: 768px) {
    padding-top: 40px;
    padding-bottom: 40px;
  }
`

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 32px;

  @media (max-width: 375px) {
    flex-direction: column;
    justify-content: center;
  }
`

const ExternalLink = styled.a`
  color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['700'] : colors[primaryColorKey]['500']};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  ${typography.styles.textMd};
  ${typography.weights.semibold};
  
  @media (max-width: 375px) {
    justify-content: start;
  }
`

const Heading = styled.h2`
  color: ${props => props.theme.color};
  ${typography.styles.displayXs};
  ${typography.weights.semibold};

  @media (max-width: 768px) {
    ${typography.styles.textXl};
    ${typography.weights.semibold};
  }
`

const VideosContainer = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 32px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
