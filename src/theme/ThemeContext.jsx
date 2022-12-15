import React, { useMemo } from 'react'

import {
  createGlobalStyle,
  ThemeProvider as StyledComponentsThemeProvider
} from 'styled-components'

import {
  colors,
  primaryColorKey
} from '../../styles/colors'
import {
  darkTheme,
  lightTheme
} from '../../styles/theme'
import { useDarkMode } from '../hooks/useDarkMode'

const GlobalStyle = createGlobalStyle`
  :root {
    --header-height: 80px;
    scroll-padding-top: 6rem;
  }

  @media (max-width: 768px) {
    :root {
      --header-height: 72px;
    }
  }

  html {
    color-scheme: ${props => props.theme.colorScheme};
    text-rendering: optimizeSpeed;
    // content-visibility: auto;
  }
  
  html,
  body {
    height: 100%;
    font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-kerning: normal;
    font-variant-ligatures: common-ligatures;
    font-variant-numeric: tabular-nums;
  }
  
  body {
    background-color: ${props => props.theme.primaryBackgroundColor};
    color: ${props => props.theme.color};
  }

  *, *::before, *::after {
    padding: 0;
    margin: 0;
    font: inherit;
    border: none;
    background-color: transparent;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['600'] : colors[primaryColorKey]['300']};
    
    :hover, :active{
      color: ${colors.rose[600]};
      text-decoration:none;
    }
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }

  figure:has(figcaption) {
    border: 1px dashed ${props => props.theme.isLightMode ? colors.gray['300'] : colors.gray['600']};
    margin: 0.5rem 0 1.5rem 0;
    border-radius: 1rem;
    padding: 0.5rem;

    img{
      margin:unset!important;
    }

    figcaption {
      color: ${colors.gray['500']};
      font-size: 0.78rem;
      line-height: 1rem;
      text-align: center;
    }
    

    figcaption a, figcaption a:hover {
      color: unset;
    }
  }

  svg.icon {
    width: 24px;
    height: 24px;
  }

  ul, ol {
    margin-top: 20px;
    padding-left: 20px;
  }
`

const ThemeContext = React.createContext({
  darkMode: false,
  setDarkMode: () => { }
})

export const ThemeProvider = (props) => {
  const [darkMode, setDarkMode] = useDarkMode()

  const memoizedValue = useMemo(() => {
    return { darkMode, setDarkMode }
  }, [darkMode, setDarkMode])

  return (
    <ThemeContext.Provider value={memoizedValue}>
      <StyledComponentsThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        {props.children}
        <GlobalStyle />
      </StyledComponentsThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
