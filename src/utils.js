const getFormattedDate = (x) => {
  // Safari doesn't like dashes
  const normalized = x.replace(/-/g, '/')

  const code = 'en'

  return new Date(normalized).toLocaleDateString(code, {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  })
}

const copyToClipBoard = (text) => {
  if (!navigator.clipboard) {
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

  navigator?.clipboard?.writeText(text)
}

export { getFormattedDate, copyToClipBoard }
