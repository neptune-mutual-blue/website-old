import Link from 'next/link'
import styled, { useTheme } from 'styled-components'
import { colors } from '../../../styles/colors'
import { typography } from '../../../styles/typography'
import NpmLogo from '../logos/npm-full'
import NpmLogoInverse from '../logos/npm-full-inverse'
import { nav } from './data'
import { useTranslation } from 'react-i18next'
import { utils } from '../../../styles/utils'

export const Navigation = () => {
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
          return (
            <ListContainer key={idx}>
              <H3>{t(list.title)}</H3>
              <Ul>
                {list.links.map((link) => {
                  return (
                    <Li key={link.href}>
                      {link.isExternal
                        ? <a href={link.href} target='_blank' rel='noreferrer'>{t(link.text)}</a>
                        : <Link href={link.href}>{t(link.text)}</Link>}
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
  justify-content: space-between;
  gap: 48px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const LogoContainer = styled(Link)`
  display: block;

  > span {
    ${utils.srOnly};
  }
`

const Nav = styled.nav`
  --gap: 32px;
  flex: 1;
  max-width: 768px;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--gap);
`

const ListContainer = styled.section`
  flex: 1;
  
  @media (max-width: 768px) {
    flex: 1 1 auto;
    width: calc(50% - var(--gap) / 2);
  }
`

const H3 = styled.h3`
  color: ${(props) => props.theme.isLightMode ? colors.gray['500'] : colors.gray['400']};

  ${typography.styles.textSm};
  ${typography.weights.semibold};
`

const Ul = styled.ul`
  margin-top: 16px;

  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Li = styled.li`
  color: ${(props) => props.theme.secondaryColor};

  ${typography.styles.textMd};
  ${typography.weights.semibold};
`
