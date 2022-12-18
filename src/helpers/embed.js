function updateIframeHeight (targetId, newHeight) {
  const e = document.getElementById(targetId)
  e.children[0].style.height = parseInt(newHeight) + 'px'
}

function embedGist (target, gistId, fileName) {
  const frame = document.createElement('iframe')
  frame.setAttribute('width', '100%')
  frame.id = 'gist-frame-' + gistId

  if (!target.id || target.id === '') {
    if (fileName) {
      /* id can already be taken */
      target.id = 'gist-' + target.getAttribute('data-id') + '-' + fileName.split('.')[0]
    } else {
      target.id = 'gist-' + target.getAttribute('data-id')
    }
  }
  target.innerHTML = ''
  target.appendChild(frame)

  let frameHTML = '<html><body><script type="text/javascript" src="https://gist.github.com/'
  if (fileName) {
    frameHTML += `${gistId}.js?file=${fileName}"></script></body></html&gt;`
  } else {
    frameHTML += `${gistId}.js"></script></body></html&gt;`
  }

  let frameDocument = frame.document

  if (frame.contentDocument) {
    frameDocument = frame.contentDocument
  } else if (frame.contentWindow) {
    frameDocument = frame.contentWindow.document
  }

  frameDocument.open()
  frameDocument.writeln(frameHTML)
  const links = frameDocument.querySelectorAll('a')
  for (let i = 0; i < links.length; i++) {
    links[i].setAttribute('target', '_blank')
  }

  frameDocument.close()

  frame.onload = function () {
    updateIframeHeight(target.id, frame.contentDocument.body.scrollHeight)
  }
  // console.log('iframe added')
}

export const parseEmbeds = async (el = document) => {
  for (const i of el.querySelectorAll('a[data-embed-type]')) {
    try {
      const embedType = i.getAttribute('data-embed-type')
      const oEmbed = i.getAttribute('data-oembed')

      if (embedType === 'youtube') {
        const res = await fetch(oEmbed)
        const data = await res.json()

        const container = document.createElement('div')
        container.innerHTML = data.html

        i.replaceWith(container)
      }

      if (embedType === 'github') {
        const id = oEmbed.split('/').pop().split('.').shift()

        const container = document.createElement('div')
        i.replaceWith(container)

        embedGist(container, id)
      }

      // console.log([embedType, oEmbed])
    } catch (err) {
    // do something with `err`
      console.log('Failed: ', i.getAttribute('data-embed-type'))
      console.log(err)
    }
  }
}
