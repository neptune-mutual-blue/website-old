import styled from 'styled-components'
import { colors } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import PlayIcon from '../../Icon/custom/PlayIcon'
import { useVideosContext } from '../../../context/VideosContext'

export const Video = ({ video }) => {
  const { setId } = useVideosContext()

  return (
    <Container onClick={() => { setId(video.videoId) }}>
      <Thumbnail>
        <img src={video.image} alt={video.title} loading='lazy' />
        <Overlay>
          <PlayIcon />
        </Overlay>
      </Thumbnail>
      <Content>
        <Title>{video.title}</Title>
        <SupportingText>{video.description.text}</SupportingText>
      </Content>
    </Container>
  )
}

const Container = styled.button`
  display: flex;
  align-items: flex-start;
  text-align: left;
  padding: 12px;
  gap: 24px;
  border-radius: 8px;

  :hover {
    background-color: ${props => props.theme.isLightMode ? colors.white : colors.gray['800']};
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Thumbnail = styled.div`
  width: 176px;
  height: 104px;
  flex-shrink: 0;
  border-radius: 6px;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    width: 240px;
    height: 136px;
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
    width: 48px;
    height: 48px;

    @media (max-width: 768px) {
      width: 56px;
      height: 56px;
    }
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
  color: ${props => props.theme.color};

  ${typography.styles.textMd};
  ${typography.weights.medium};
`

const SupportingText = styled.p`
  margin-top: 4px;
  color: ${props => props.theme.secondaryColor};

  ${typography.styles.textSm};
  ${typography.weights.regular};
`
