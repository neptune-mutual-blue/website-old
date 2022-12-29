import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../styles/colors'
import { utils } from '../../../styles/utils'
import { Icon } from '../Icon'
import { social } from './data'

export const SocialLinks = () => {
  return (
    <Container>
      {social.map(link => {
        return (
          <ExternalLink key={link.href} href={link.href} target='_blank' rel='nofollow noopener noreferrer'>
            <span>{link.text}</span>
            <Icon size={24} variant={link.icon} />
          </ExternalLink>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
`

const ExternalLink = styled.a`
  display: inline-flex;
  color: ${props => props.theme.isLightMode ? colors.gray['800'] : colors.white};

  > span {
    ${utils.srOnly};
  }

  :hover {
    color: ${colors[primaryColorKey]['600']};
  }
`
