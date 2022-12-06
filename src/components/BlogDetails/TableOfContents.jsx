import React, {
  useEffect,
  useState
} from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import styled, { css } from 'styled-components'

import {
  colors,
  primaryColorKey
} from '../../../styles/colors'
import { typography } from '../../../styles/typography'

export const TableOfContents = ({ wrapperClass, title }) => {
  const [headers, setHeaders] = useState([])
  const [currentHeader, setCurrentHeader] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (!wrapperClass) return

    const selector = `.${wrapperClass} > h2, .${wrapperClass} > h3, .${wrapperClass} > h4`
    const headerElements = document.querySelectorAll(selector)

    const h = []
    headerElements.forEach((el) => {
      const elName = el.tagName
      const elText = el.textContent.replace(/^(\s)+|(\s)+$/g, '')
      // .replace(/^(\d+\.\s)/g, '') to remove preceeding numbers

      const elId = el.getAttribute('id') || ''

      if (elName === 'H2') {
        h.push({ text: elText, id: elId, children: [] })
      }

      if (elName === 'H3') {
        let lastH2Index = h.length - 1

        if (!h[lastH2Index]) h.push({ text: '', children: [] })

        lastH2Index = h.length - 1
        h[lastH2Index].children.push({ text: elText, id: elId, children: [] })
      }
    })

    setHeaders(h)
  }, [wrapperClass])

  useEffect(() => {
    const hash = router.asPath.split('#')[1] || ''
    setCurrentHeader(hash)
  }, [router.asPath])

  return (
    <Container>
      <Label>Table of Contents</Label>

      <TitleLink isactive={currentHeader === '' ? 'true' : 'false'} href={router.asPath.split('#')[0] + '#'}>
        <p>{title}</p>
      </TitleLink>

      {
        headers?.length
          ? (
            <Content>
              {
                headers.map((e, i) => (
                  <React.Fragment key={i}>
                    {
                      e.text
                        ? (
                          <HeaderLink
                            isactive={(e.id && currentHeader === e.id) ? 'true' : 'false'}
                            href={`#${e.id || ''}`}
                          >
                            <span>{e.text}</span>
                          </HeaderLink>
                          )
                        : <></>
                    }
                    {
                    e?.children?.length
                      ? e.children.map((e2, i2) => (
                        <React.Fragment key={i2}>
                          <HeaderLink2
                            isactive={(e2.id && currentHeader === e2.id) ? 'true' : 'false'}
                            href={`#${e2.id || ''}`}
                          ><span>{e2.text}</span>
                          </HeaderLink2>
                        </React.Fragment>
                      ))
                      : <></>
                  }
                  </React.Fragment>
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
  margin-right: 24px;

  @media (min-width: 1400px) {
    margin-left: auto;
  }

  @media (min-width: 934px) {
    position: sticky;
    top: 100px;

    max-height: calc(100vh - 100px);
    overflow-y: auto
  }
  `

const Label = styled.p`
  ${typography.styles.textMd};
  ${typography.weights.semibold};
  color: ${colors.gray[400]};
  padding-left: 8px;
`

const LinkStyle = css`
  color: ${props => (props.theme.isLightMode ? colors.gray[600] : colors.gray[25])};
  background-color: transparent;

  &[isactive='true'] {
    color: ${props => props.theme.isLightMode ? colors[primaryColorKey][700] : colors.gray[25]};
    background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey][100] : colors.gray[600]}
  }

  &[isactive='false']:hover {
    background-color: ${props => props.theme.isLightMode ? colors.gray[200] : colors.gray[700]}
  }
`

const TitleLink = styled(Link)`
  display: block;
  ${typography.styles.textMd};
  ${typography.weights.semibold};
  
  ${LinkStyle}

  padding: 4px 8px;
  border-radius: 4px;
  margin-top: 20px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  margin-top: 8px;

  ${typography.styles.textMd};
  ${typography.weights.semibold};

  color: ${props => props.theme.isLightMode ? colors.gray[600] : colors.gray[25]};
`

const HeaderLink = styled(Link)`
  ${LinkStyle}
  border-radius: 4px;
  margin-left: 16px;
  padding: 4px 8px;
  `

const HeaderLink2 = styled(Link)`
  ${LinkStyle}
  border-radius: 4px;
  margin-left: 24px;
  padding: 4px 8px;
`
