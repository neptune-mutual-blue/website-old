import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../../styles/colors'
import { typography } from '../../../../../styles/typography'
import { useVideosContext } from '../../../../context/VideosContext'
import { Icon } from '../../../Icon'
import { DesktopNavMenuItemLink } from './Link'
import { Video } from '../../common/Video'

export const Section = ({ section }) => {
  const { t } = useTranslation('common')
  const { videos } = useVideosContext()

  if (!section.links) {
    return (
      <div>
        <Title>{t(section.title)}</Title>

        {videos && (
          <Content>
            {videos.map((video, idx) => {
              return <Video key={idx} video={video} />
            })}
          </Content>
        )}

        {section.more && (
          <More href={section.more.href} rel='noreferrer' target='_blank'>
            {t(section.more.title)} <Icon size={20} variant='arrow-right' />
          </More>
        )}
      </div>
    )
  }

  return (
    <div>
      <Title>{t(section.title)}</Title>
      <Content>
        {section.links.map((link, idx) => {
          return (
            <DesktopNavMenuItemLink key={idx} item={link} />
          )
        })}
      </Content>
    </div>
  )
}

const Title = styled.h4`
  color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['600'] : colors[primaryColorKey]['300']};

  ${typography.styles.textSm};
  ${typography.weights.semibold};
`

const Content = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const More = styled.a`
  margin-top: 16px;
  display: inline-flex;
  color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['600'] : colors[primaryColorKey]['300']};
  gap: 8px;

  ${typography.styles.textSm};
  ${typography.weights.semibold};

  :hover, :active{
    color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['600'] : colors[primaryColorKey]['300']};
  }
`
