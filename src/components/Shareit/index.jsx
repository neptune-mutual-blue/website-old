import styled from 'styled-components'

import { useTranslation } from 'react-i18next'
import { colors } from '../../../styles/colors'
import { Icon } from '../Icon'
import { useEffect, useState } from 'react'

const Share = styled.div``

const Link = styled.a`
  display: inline-flex;
  color: ${props => props.theme.isLightMode ? colors.gray['600'] : colors.white};
  border: 1px solid ${props => props.theme.isLightMode ? colors.gray['300'] : colors.gray['600']};
  border-radius: 8px;
  padding: 10px;
  margin-right: 12px;
  
  svg {
    ${props => props.hasText && 'margin-right:10px;'}
    z-index: -1;
  }
`

function Shareit (props) {
  const { t } = useTranslation('common')

  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1500)
    }
  }, [copied])

  function fallbackCopyTextToClipboard (text) {
    const textArea = document.createElement('textarea')
    textArea.value = text

    // Avoid scrolling to bottom
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      document.execCommand('copy')
    } finally {
      document.body.removeChild(textArea)
    }
  }

  function copy (e) {
    e.preventDefault()
    const text = `${window.location.origin}${props.href}`
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text)
    }

    navigator?.clipboard?.writeText(text)
    setCopied(true)
  }

  function share (e) {
    e.preventDefault()

    const url = new URL(e.target.href)
    url.searchParams.append(e.target.getAttribute('data-url'), `${window.location.origin}${props.href}`)
    const newWindow = window.open(url.href)
    newWindow.opener = null
  }

  return (
    <Share>

      <Link href='javascript:' hasText onClick={copy}>
        <Icon size='20' variant='copy-01' />  {copied ? t('COPIED') : t('COPY_LINK')}
      </Link>

      <Link onClick={share} data-url='url' href={`https://twitter.com/intent/tweet?text=${props.intro}`} target='_blank' rel='nofollow noopener noreferrer'>
        <Icon size='20' variant='twitter' />
      </Link>

      <Link onClick={share} data-url='u' href='https://www.facebook.com/sharer/sharer.php' target='_blank' rel='nofollow noopener noreferrer'>
        <Icon size='20' variant='facebook' />
      </Link>

      <Link onClick={share} data-url='url' href={`https://www.linkedin.com/shareArticle?mini=true&title=${props.title}&summary=${props.intro}&source=Neptune Mutual`} target='_blank' rel='nofollow noopener noreferrer'>
        <Icon size='20' variant='linkedin' />
      </Link>

    </Share>
  )
}

export { Shareit }
