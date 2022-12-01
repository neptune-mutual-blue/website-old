import { Dialog } from '@headlessui/react'
import styled from 'styled-components'
import { blurs } from '../../styles/blurs'
import { colors } from '../../styles/colors'
import { utils } from '../../styles/utils'

export const VideoModal = ({ videoId, setId }) => {
  return (
    <StyledDialog open={!!videoId} onClose={() => setId(null)}>
      <Panel>
        <Title>Youtube Video</Title>
        <Description>
          Playing the video that you've selected below in an iframe
        </Description>

        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          title='Embedded youtube'
        />

      </Panel>
    </StyledDialog>
  )
}

const StyledDialog = styled(Dialog)`
  z-index: 2;
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  width: 100%;
  background-color: ${colors.gray['900'].startsWith('#') ? colors.gray['900'] + 'b2' : 'rgba(0, 0, 0, 0.7)'};
  backdrop-filter: ${blurs.xl};

  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled(Dialog.Title)`
  ${utils.srOnly}
`

const Description = styled(Dialog.Description)`
  ${utils.srOnly}
`

const Panel = styled(Dialog.Panel)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  iframe {
    width: 800px;
    min-height: 300px;
    max-height: 80%;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
    aspect-ratio: 16 / 9;
  }
`