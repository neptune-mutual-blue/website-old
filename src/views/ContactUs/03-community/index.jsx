import styled, { useTheme } from 'styled-components'
import { colors } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { Icon } from '../../../components/Icon'

const links = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/neptunemutual',
    Icon: <Icon variant='twitter-default' />,
    IconWhite: <Icon variant='twitter' />
  },
  {
    name: 'Reddit',
    href: 'https://www.reddit.com/r/NeptuneMutual/',
    Icon: <Icon variant='reddit-default' />,
    IconWhite: <Icon variant='reddit' />
  },
  {
    name: 'Telegram',
    href: 'https://t.me/neptunemutual',
    Icon: <Icon variant='telegram-default' />,
    IconWhite: <Icon variant='telegram' />
  },
  {
    name: 'Github',
    href: 'https://github.com/neptune-mutual',
    Icon: <Icon variant='github-default' />,
    IconWhite: <Icon variant='github' />
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/neptune-mutual/',
    Icon: <Icon variant='linkedin-default' />,
    IconWhite: <Icon variant='linkedin' />
  },
  {
    name: 'Medium',
    href: 'https://medium.com/neptune-mutual',
    Icon: <Icon variant='medium-default' />,
    IconWhite: <Icon variant='medium' />
  },
  {
    name: 'Youtube',
    href: 'https://www.youtube.com/@NeptuneMutual',
    Icon: <Icon variant='youtube-default' />,
    IconWhite: <Icon variant='youtube' />
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/2qMGTtJtnW',
    Icon: <Icon variant='discord-default' />,
    IconWhite: <Icon variant='discord' />
  }
]

export const CommunityChannels = () => {
  const theme = useTheme()

  return (
    <Wrapper>
      <Container>
        <IntroContainer>
          <Title>Community Channels</Title>
          <SubHeading>
            Don't be a stranger! Join and interact with us and our growing social media communities. Stay up to date on our latest developments and progress.
          </SubHeading>
        </IntroContainer>
        <LinksContainer>
          {
            links.map(({ name, Icon, IconWhite, href }, i) => (
              <LinkWrapper key={i}>
                <SocialLink href={href} target='_blank' rel='noreferrer nofollow'>
                  {theme.isLightMode ? Icon : IconWhite}
                  {name}
                </SocialLink>
              </LinkWrapper>
            ))
          }
        </LinksContainer>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: ${props => props.theme.isLightMode ? colors.white : colors.gray[800]};

  @media screen and (min-width: 768px) {
    padding-left: 32px;
    padding-right: 32px;
  }
`

const Container = styled.div`
  ${utils.fullWidthContainer};
  margin-bottom: 96px;

  padding-top: 64px;
  padding-bottom: 64px;

  background-color: ${props => props.theme.isLightMode ? colors.gray[50] : colors.gray[700]};
  
  @media screen and (min-width: 768px) {
    border-radius: 16px;
  }
`

const IntroContainer = styled.div`
  max-width: 805px;
  margin: auto;

  text-align: center;
`

const Title = styled.h2`
  ${typography.styles.displayMd}
  ${typography.weights.semibold}
`

const SubHeading = styled.p`
  margin-top: 24px;
  ${typography.styles.textXl}
  ${typography.weights.regular}
  color: ${props => props.theme.isLightMode ? colors.gray[600] : colors.gray[25]};
`

const LinksContainer = styled.div`
  margin: auto;
  margin-top: 40px;
  display: grid;
  width: 684px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  row-gap: 24px;
  column-gap: 4px;
  
  @media screen and (max-width: 934px) {
    grid-template-columns: repeat(3, 1fr);
    width: max-content;
  }
  
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 16px;
  }
`

const LinkWrapper = styled.div`
  padding: 8px 26px;
  width: max-content;

  ${typography.styles.textXl}
  ${typography.weights.bold}
  
  svg {
    width: 32px;
    height: 32px;
  }
  
  @media screen and (max-width: 768px) {
    padding: 8px 16px;
    ${typography.styles.textLg}
  
    svg {
      width: 24px;
      height: 24px;
    }
  }
`

const SocialLink = styled.a`
  display: flex;
  gap: 12px;
  align-items: center;
  color: ${props => props.theme.isLightMode ? colors.gray[900] : colors.white};  

  :hover{
    color: ${props => props.theme.isLightMode ? colors.gray[900] : colors.white}; 
  }
`
