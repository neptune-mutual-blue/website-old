import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components'

import { colors } from '../../../styles/colors'
import { typography } from '../../../styles/typography'
import { utils } from '../../../styles/utils'
import NpmLogo from '../logos/npm-full'
import NpmLogoInverse from '../logos/npm-full-inverse'
import { nav } from './data'

export const Navigation = ({ pages }) => {
  const theme = useTheme()
  const { t } = useTranslation('common')

  return (
    <Container>
      <LogoContainer href='/'>
        <span>Neptune Mutual</span>
        {theme.isLightMode ? <NpmLogo /> : <NpmLogoInverse />}
      </LogoContainer>

      <Nav>
        {nav.map((list, idx) => {
          if (list.links === 'pages') {
            list.links = pages.map(page => {
              return { href: `/policies/${page.slug}`, text: page.title, isExternal: false }
            })
          }

          return (
            <ListContainer key={idx}>
              <H3>{t(list.title)}</H3>
              <Ul>
                {list.links.map((link) => {
                  return (
                    <Li key={link.href}>
                      {link.isExternal
                        ? <a href={link.href} target='_blank' rel='noreferrer'>{t(link.text)}</a>
                        : <StyledLink href={link.href}>{t(link.text)}</StyledLink>}{link?.badge && <Badge>{link.badge}</Badge>}
                    </Li>
                  )
                })}
              </Ul>
            </ListContainer>
          )
        })}
      </Nav>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 48px;

  @media (min-width: 1024px) {
    flex-direction: row;
  }  
`

const LogoContainer = styled(Link)`
  display: block;

  > span {
    ${utils.srOnly};
  }
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  --gap: 32px;
  flex: 1;
  max-width: 768px;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--gap);

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`

const ListContainer = styled.section`
  flex: 1;
`

const H3 = styled.h3`
  color: ${(props) => props.theme.isLightMode ? colors.gray['500'] : colors.gray['400']};

  ${typography.styles.textSm};
  ${typography.weights.semibold};
`

const Ul = styled.ul`
  margin-top: 16px;
  padding-left: 0;

  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Li = styled.li`
  color: ${(props) => props.theme.secondaryColor};
  display: flex;

  ${typography.styles.textMd};
  ${typography.weights.semibold};

  a:hover{
    text-decoration: none;
  }
`
const Badge = styled.div`
  ${typography.styles.textSm};
  ${typography.weights.medium};
  color: ${props => props.theme.isLightMode ? colors.success[700] : colors.success[400]};
  background: ${props => props.theme.isLightMode ? colors.success[50] : colors.gray[700]};
  padding: 2px 10px;
  border-radius: 16px;
  margin-left: 8px;
`
const StyledLink = styled(Link)`
  display:flex;
`
