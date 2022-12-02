import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../styles/colors'
import { typography } from '../../../styles/typography'
import { generateHash } from '../../utils'

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
      const id = el.getAttribute('id')
      const elId = id ? `${id}-permalink` : `header-${generateHash(elText)}-permalink`

      const newEl = document.createElement('i')
      newEl.setAttribute('id', elId)
      newEl.style.display = 'block'
      newEl.style.height = elName === 'H2' ? '40px' : '50px'
      el.parentElement.insertBefore(newEl, el)

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

      <Link href={router.asPath.split('#')[0] + '#'}>
        <Title highlight={currentHeader === ''}>{title}</Title>
      </Link>

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
                            isactive={currentHeader === e.id}
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
                            isactive={currentHeader === e2.id}
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
  max-width: 284px;
  padding-bottom: 20px;

  @media (min-width: 1400px) {
    margin-left: auto;
    margin-right: 50px;
  }

  @media (min-width: 768px) {
    position: sticky;
    top: 100px;

    max-height: calc(100vh - 100px);
    overflow-y: auto
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const Label = styled.p`
  ${typography.styles.textMd};
  ${typography.weights.semibold};
  color: ${colors.gray[400]};
  padding-left: 8px;
`

const Title = styled.p`
  ${typography.styles.textMd};
  ${typography.weights.semibold};

  color: ${props => props.highlight ? (props.theme.isLightMode ? colors[primaryColorKey][700] : colors.gray[25]) : (props.theme.isLightMode ? colors.gray[600] : colors.gray[25])};
  background-color: ${props => props.highlight ? (props.theme.isLightMode ? colors[primaryColorKey][100] : colors.gray[600]) : 'transparent'};

  padding: 4px 8px;
  border-radius: 4px;
  margin-top: 20px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  margin-top: 8px;

  ${typography.styles.textMd};
  ${typography.weights.semibold};

  color: ${props => props.theme.isLightMode ? colors.gray[600] : colors.gray[25]};
`

const HeaderLink = styled(Link)`
  color: ${props => props.isactive ? (props.theme.isLightMode ? colors[primaryColorKey][700] : colors.gray[25]) : (props.theme.isLightMode ? colors.gray[600] : colors.gray[25])};
  background-color: ${props => props.isactive ? (props.theme.isLightMode ? colors[primaryColorKey][100] : colors.gray[600]) : 'transparent'};
  border-radius: 4px;
  margin-left: 16px;
  padding-left: 5px;
`

const HeaderLink2 = styled(Link)`
  color: ${props => props.isactive ? (props.theme.isLightMode ? colors[primaryColorKey][700] : colors.gray[25]) : (props.theme.isLightMode ? colors.gray[600] : colors.gray[25])};
  background-color: ${props => props.isactive ? (props.theme.isLightMode ? colors[primaryColorKey][100] : colors.gray[600]) : 'transparent'};
  border-radius: 4px;
  margin-left: 24px;
  padding-left: 5px;
`
