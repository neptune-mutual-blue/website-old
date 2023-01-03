import React, {
  useEffect,
  useState
} from 'react'

import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

import { getSlug } from '../../services/helpers/slug'
import {
  colors,
  primaryColorKey
} from '../../styles/colors'
import { typography } from '../../styles/typography'

export const TableOfContents = ({ title, headers }) => {
  const { t } = useTranslation('common')
  const [currentHeader, setCurrentHeader] = useState('')
  const router = useRouter()

  useEffect(() => {
    const hash = router.asPath.split('#')[1] || ''
    setCurrentHeader(hash)
  }, [router.asPath])

  useEffect(() => {
    const handleHashChange = ({ newURL }) => {
      const hash = newURL.split('#')[1] || ''
      setCurrentHeader(hash)
    }

    if (window) window.addEventListener('hashchange', handleHashChange)

    return () => {
      if (window) window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return (
    <Container>
      <Label>{t('Table of Contents')}</Label>

      <TitleLink
        data-is-active={currentHeader === '' ? 'true' : 'false'}
        href={router.asPath.split('#')[0] + '#' + getSlug(title)}
      >
        {title}
      </TitleLink>

      {
        headers?.length
          ? (
            <Content>
              {
                headers.map((e, i) => (
                  <HeaderContainer key={i}>
                    <HeaderLink
                      data-is-active={(e.id && currentHeader === e.id) ? 'true' : 'false'}
                      href={`#${e.id || ''}`}
                      headerType={e.type}
                    >
                      <span>{e.text}</span>
                    </HeaderLink>
                  </HeaderContainer>
                ))
            }
            </Content>
            )
          : <></>
      }

    </Container>
  )
}

const Container = styled.div`
  padding-bottom: 20px;
  padding-right: 24px;

  @media (min-width: 1400px) {
    margin-left: auto;
  }

  @media (min-width: 1024px) {
    position: sticky;
    top: 100px;

    max-height: calc(100vh - 100px);
    overflow-y: auto
  }
  `

const Label = styled.p`
  ${typography.styles.textMd};
  ${typography.weights.semibold};
  color:  ${props => (props.theme.isLightMode ? colors.gray[500] : colors.gray[300])};
  padding-left: 8px;
`

const LinkStyle = css`
  color: ${props => (props.theme.isLightMode ? colors.gray[600] : colors.gray[25])};
  background-color: transparent;

  &[data-is-active='true'] {
    color: ${props => props.theme.isLightMode ? colors[primaryColorKey][700] : colors.gray[25]};
    background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey][100] : colors.gray[600]};
  }

  &[data-is-active='false']:hover {
    background-color: ${props => props.theme.isLightMode ? colors.gray[200] : colors.gray[700]};
    color: ${props => (props.theme.isLightMode ? colors.gray[600] : colors.gray[25])};
  }
`

const TitleLink = styled.a`
  display: block;
  ${typography.styles.textMd};
  ${typography.weights.semibold};
  
  ${LinkStyle}

  padding: 4px 8px;
  border-radius: 4px;
  margin-top: 20px;
`

const Content = styled.ol`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  margin-top: 4px;
  padding-left: 0;

  ${typography.styles.textMd};
  ${typography.weights.semibold};

  color: ${props => props.theme.isLightMode ? colors.gray[600] : colors.gray[25]};
`

const HeaderContainer = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const HeaderLink = styled.a`
  ${LinkStyle};
  display: flex;
  border-radius: 4px;
  margin-left: ${props => {
    return (props.headerType || 2) * 8
  }}px;
  padding: 4px 8px;
`
