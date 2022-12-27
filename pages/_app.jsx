import { useEffect, useState } from 'react'
import { appWithTranslation } from 'next-i18next'
import { Router } from 'next/router'
import styled from 'styled-components'

import 'slick-carousel/slick/slick.css'
import '../styles/inter.css'

import { ThemeProvider } from '../src/theme/ThemeContext'
import { VideosProvider } from '../src/context/VideosContext'
import { Footer } from '../src/components/Footer'
import { Header } from '../src/components/Header'
import { colors } from '../styles/colors'
import { MobileNavContainer } from '../src/components/Nav/MobileNavigation'
import { PageLoader } from '../src/components/PageLoader'
import { CookiesAndAnalytics } from '../src/components/CookiesAndAnalytics'
import { scrollToHash } from '../src/helpers'
import Script from 'next/script'
import { WalletContextProvider } from '../src/context/WalletContext'

function MyApp ({ Component, pageProps }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Close menu after navigating to a new page
    const onClose = () => setIsMenuOpen(false)

    Router.events.on('routeChangeComplete', onClose)

    return () => {
      Router.events.off('routeChangeComplete', onClose)
    }
  }, [])

  useEffect(() => {
    scrollToHash()
  }, [])

  return (
    <ThemeProvider>
      <WalletContextProvider>
        <VideosProvider videos={pageProps.videos}>
          <HeaderContainer>
            <PageLoader />
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} colored={pageProps.headerStyle === 'colored'} />
            <Border />
          </HeaderContainer>
          <MainContainer>
            <Component {...pageProps} />
            <MobileNavContainer isMenuOpen={isMenuOpen} />
          </MainContainer>
          <Footer pages={pageProps.pages} />
        </VideosProvider>
      </WalletContextProvider>
      <CookiesAndAnalytics />
      {pageProps.hasTweets && <Script defer src='https://platform.twitter.com/widgets.js' />}
    </ThemeProvider>
  )
}

export default appWithTranslation(MyApp)

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
`

const Border = styled.div`
  mix-blend-mode: multiply;
  border-bottom: 1px solid ${(props) => props.theme.isLightMode ? colors.gray['200'] : colors.gray['700']};
`

const MainContainer = styled.div`
  padding-top: var(--header-height);
`
