import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
      })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()]
      }
    } finally {
      sheet.seal()
    }
  }

  render () {
    return (
      <Html>
        <Head>
          <link rel='apple-touch-icon' sizes='57x57' href='/assets/images/meta/icons/apple-icon-57x57.webp' />
          <link rel='apple-touch-icon' sizes='60x60' href='/assets/images/meta/icons/apple-icon-60x60.webp' />
          <link rel='apple-touch-icon' sizes='72x72' href='/assets/images/meta/icons/apple-icon-72x72.webp' />
          <link rel='apple-touch-icon' sizes='76x76' href='/assets/images/meta/icons/apple-icon-76x76.webp' />
          <link rel='apple-touch-icon' sizes='114x114' href='/assets/images/meta/icons/apple-icon-114x114.webp' />
          <link rel='apple-touch-icon' sizes='120x120' href='/assets/images/meta/icons/apple-icon-120x120.webp' />
          <link rel='apple-touch-icon' sizes='144x144' href='/assets/images/meta/icons/apple-icon-144x144.webp' />
          <link rel='apple-touch-icon' sizes='152x152' href='/assets/images/meta/icons/apple-icon-152x152.webp' />
          <link rel='apple-touch-icon' sizes='180x180' href='/assets/images/meta/icons/apple-icon-180x180.webp' />
          <link rel='icon' type='image/png' sizes='192x192' href='/assets/images/meta/icons/android-icon-192x192.webp' />
          <link rel='icon' type='image/png' sizes='32x32' href='/assets/images/meta/favicons/favicon-32x32.webp' />
          <link rel='icon' type='image/png' sizes='96x96' href='/assets/images/meta/favicons/favicon-96x96.webp' />
          <link rel='icon' type='image/png' sizes='16x16' href='/assets/images/meta/favicons/favicon-16x16.webp' />
          <link rel='manifest' href='/manifest.json' />
          <meta name='msapplication-TileColor' content='#01052D' />
          <meta name='msapplication-TileImage' content='/assets/images/meta/icons/ms-icon-144x144.webp' />
          <meta name='theme-color' content='#01052D' />
        </Head>

        <body>
          <Main />
          <NextScript />
          <noscript>We’re sorry, some parts of the Neptune Mutual website don’t work properly without JavaScript enabled.</noscript>
          <script defer src='https://platform.twitter.com/widgets.js' />
        </body>
      </Html>
    )
  }
}
