import { Dialog } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { blurs } from '../../styles/blurs'
import { colors } from '../../styles/colors'
import { utils } from '../../styles/utils'

export const VideoModal = ({ videoId, setId }) => {
  const { t } = useTranslation('common')

  return (
    <StyledDialog open={!!videoId} onClose={() => setId(null)}>
      <Panel>
        <Title>{t('Youtube Video')}</Title>
        <Description>
          {t("Playing the video that you've selected below in an iframe")}
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
  z-index: 20;
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
  padding: 0 24px;
`

const Title = styled(Dialog.Title)`
  ${utils.srOnly}
`

const Description = styled(Dialog.Description)`
  ${utils.srOnly}
`

const Panel = styled(Dialog.Panel)`
  display: flex;
  justify-content: center;
  align-items: center;

  iframe {
    width: 2000px;
    min-height: 240px;
    max-height: 80%;
    max-width: 85%;
    aspect-ratio: 16 / 9;

    @media (max-width: 767px){
      max-width: 100%;
    }
  }

`
