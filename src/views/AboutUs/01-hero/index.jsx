import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { blurs } from '../../../../styles/blurs'
import {
  colors,
  primaryColorKey
} from '../../../../styles/colors'
import { shadows } from '../../../../styles/shadows'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import PlayIcon from '../../../components/Icon/custom/PlayIcon'
import { useVideosContext } from '../../../context/VideosContext'

const YoutubeId = 'GeqjuV1u4UI'

const Hero = () => {
  const { t } = useTranslation('about')
  const { setId } = useVideosContext()

  const showVideo = () => {
    setId(YoutubeId)
  }

  return (
    <Container>
      <InnerContainer>
        <Content>
          <H1>
            <Subheader>
              {t('DeFi Insurance Protocol Based on Parametric Insurance Model')}
            </Subheader>
            <HeaderTitle>
              {t('Simplifying Decentralized Insurance')}
            </HeaderTitle>
          </H1>
          <HeaderContent>
            {t('Watch out our 5-minute video to learn more about how Neptune Mutual contributes to the decentralized insurance industry.')}
          </HeaderContent>
        </Content>
      </InnerContainer>
      <VideoContainer
        title={t("Check out our 5-minute video to learn more about Neptune Mutual's contributions to the decentralized insurance industry")}
        onClick={showVideo}
      >
        <img
          alt={t('Neptune Mutual Explainer Youtube Video Thumbnail')}
          src='/assets/images/hero/reduce-exposure.webp'
        />
        <Overlay>
          <PlayIcon />
        </Overlay>
      </VideoContainer>
    </Container>
  )
}

const H1 = styled.h1``

const Container = styled.div`
  background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['25'] : colors.gray['900']};
  position: relative;
`

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 56px;
  padding-bottom: 255px;

  ${utils.fullWidthContainer};

  @media (max-width: 768px) {
    padding-bottom: 0;
  }
`

const Content = styled.div`
  text-align: center;

  @media (max-width: 768px) {
    text-align: left;
  }
`

const Subheader = styled.span`
  color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['700'] : colors[primaryColorKey]['300']};
  ${typography.weights.semibold}
  ${typography.styles.textMd}
  margin-bottom: 12px;
  display: block;
`
const HeaderTitle = styled.div`
  color: ${props => props.theme.color};
  margin-bottom: 24px;
  ${typography.styles.displayLg}
  ${typography.weights.semibold}


  @media (max-width: 887px) {
    ${typography.styles.displayMd};
  }
`

const HeaderContent = styled.p`
  max-width: 768px;
  color: ${props => props.theme.secondaryColor};
  ${typography.styles.textXl}
  ${typography.weights.regular}

  @media (max-width: 768px) {
    ${typography.styles.textLg}
    margin-bottom: 64px;
  }
`

const Overlay = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.1);
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

  &:hover {
    background: rgba(0, 0, 0, 0.3);
    fill-opacity: 0.5;
  }
`

const VideoContainer = styled.button`
  width: 887px;
  height: 499px;
  
  position: absolute;
  margin: 0 auto;
  
  top: 292px;
  left: 0;
  right: 0;

  border-radius: 10px;
  overflow: hidden;
  box-shadow: ${shadows.xl};
  backdrop-filter: ${blurs.md};

  img {
    width: 887px;
    height: 499px;
  }

  @media (max-width: 887px) {
    width: auto;
    height: auto;
    display: flex;
    
    img {
      width: auto;
      height: auto;
    }
  }

  @media (max-width: 768px) {
    position: initial;
    border-radius: 0;
  }
  
`

export { Hero }
