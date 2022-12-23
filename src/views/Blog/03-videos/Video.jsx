import styled from 'styled-components'
import { colors } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import PlayIcon from '../../../components/Icon/custom/PlayIcon'
import { useVideosContext } from '../../../context/VideosContext'

export const Video = ({ video }) => {
  const { setId } = useVideosContext()

  return (
    <Container onClick={() => { setId(video.videoId) }}>
      <Thumbnail>
        <img src={`${video.image}`} alt={video.title} loading='lazy' />
        <Overlay>
          <PlayIcon />
        </Overlay>
      </Thumbnail>
      <Content>
        <Time title={video.duration.text}>{video.duration.formatted}</Time>
        <Title>{video.title}</Title>
      </Content>
    </Container>
  )
}

const Container = styled.button`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: left;
  gap: 24px;
`

const Thumbnail = styled.div`
  overflow: hidden;
  position: relative;
  height: 216px;
  
  @media (max-width: 768px) {
    height: 193px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const Overlay = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: ${colors.white};
  fill-opacity: 0.3;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 72px;
    height: 72px;
  }

  button:hover & {
    fill-opacity: 0.5;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Title = styled.h3`
  margin-top: 8px;
  color: ${props => props.theme.color};

  ${typography.styles.displayXs};
  ${typography.weights.semibold};

  @media (max-width: 768px) {
    ${typography.styles.textXl};
    ${typography.weights.semibold};
  }
`

const Time = styled.p`
  color: ${props => props.theme.isLightMode ? colors.gray['500'] : colors.gray['400']};

  ${typography.styles.textSm};
  ${typography.weights.semibold};
`
