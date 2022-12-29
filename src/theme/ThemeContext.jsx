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
    color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['700'] : colors[primaryColorKey]['300']};
    
    :hover, :active{
      color: ${props => props.theme.isLightMode ? colors.rose['700'] : colors.rose['300']};
      text-decoration: none;
    }
  }

  a[data-type="external"]:after {
    display: inline-grid;
    content: "";
    height: 14px;
    width: 14px;
    margin: 0 0.2em 0 0.15em;
    background-image: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21 9.00001L21 3.00001M21 3.00001H15M21 3.00001L12 12M10 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V14' stroke='%23999999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
  }

  img {
    max-width: 100%;
    max-height: 100%;
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
