import {
  useEffect,
  useRef
} from 'react'

import styled, { useTheme } from 'styled-components'

import {
  colors,
  primaryColorKey
} from '../../styles/colors'
import { typography } from '../../styles/typography'
import { utils } from '../../styles/utils'
import { parseEmbeds } from '../helpers/embed'

export const HtmlContent = ({ content }) => {
  const { name } = useTheme()
  const ref = useRef()

  useEffect(() => {
    parseEmbeds(ref.current)

    if (window.twttr) {
      window.twttr.widgets.load()
    }
  }, [content])

  useEffect(() => {
    // Change tweet theme
    const tweets = document.querySelectorAll('[data-tweet-id]')

    tweets.forEach(function (tweet) {
      const src = tweet.getAttribute('src')

      const srcUrl = (new URL(src))
      srcUrl.searchParams.set('theme', name)

      tweet.setAttribute('src', srcUrl.toString())
    })
  }, [name])

  return (
    <Container>
      <div ref={ref} dangerouslySetInnerHTML={{ __html: content }} />
    </Container>
  )
}

const Container = styled.div`
  ${typography.styles.textLg};
  ${typography.weights.regular};
  color: ${props => props.theme.secondaryColor};

  strong {
    ${typography.weights.bold};
  }

  em {
    font-style: italic;
  }

  .underline {
    text-decoration: underline;
  }

  p, ul, ol {
    display: block;
    margin: 0 0 28px 0;

    color: ${props => props.theme.isLightMode ? colors.gray[600] : colors.gray[25]};
    ${typography.styles.textLg}
  
    @media screen and (max-width: 767px) {
      ${typography.styles.textMd}
    }
  }

  h2, h3, h4 {
    color: ${props => props.theme.isLightMode ? colors.gray[900] : colors.white};
  }

  h2 {
    margin: 20px 0;
    ${typography.styles.displaySm};
    ${typography.weights.semibold};
  }

  h3 {
    margin: 16px 0;
    ${typography.styles.displayXs};
    ${typography.weights.semibold};
  }

  h4 {
    margin: 12px 0;
    ${typography.styles.textXl};
    ${typography.weights.semibold};
  }

  li {
    line-height: 28px;
  }

  blockquote {
    border-left: 2px solid ${props => props.theme.isLightMode ? colors[primaryColorKey]['700'] : colors[primaryColorKey]['500']};
    padding-left: 20px;
    margin-top: 48px;
    margin-bottom: 48px;
    ${typography.styles.displayXs};
    ${typography.weights.medium};
    font-style: italic;
  }

  img {
    display: inline-block;
    margin: 1rem auto;
    height: auto;
    width: 100%;
    object-fit: contain;
    border-radius: 12px;
  }

  & > *:first-child {
    margin-top: 0;
    padding-top: 0;
  }

  iframe {
    margin: 2rem 0;
    width: 100%;
    min-height: 400px;

    @media (max-width: 767px) {
      min-height: 300px;
    }
  }

  /* External content */
  .gist {width:100% !important;}
  .gist-file
  .gist-data {max-height: 100% !important; max-width: 100% !important;}

  .twitter-tweet.twitter-tweet-rendered {
    margin-left: auto;
    margin-right: auto;
  }

  /* Custom classes */
  h1, h2, h3, h4, h5, h6 {
    display: flex;
    
    .heading-anchor {
      display: inline-block;
      margin-left: 0.5rem;
      opacity: 0;
      color: ${colors.gray[400]};
      font-weight: 300;
    }
    
    :hover .heading-anchor {
      opacity: 1;
      text-decoration: none;

      :hover {
        color: ${props => props.theme.isLightMode ? colors.gray['600'] : colors.gray['300']};
      }  
    }
  }

  /* Legacy blog content */
  /* Bookmarks
   –––––––––––––––––––––––––––––––––––––––––––––––––––– */
  .kg-bookmark-container {
    overflow: hidden;
    border-radius: 12px;
  }

  .kg-bookmark-container,
  .kg-bookmark-content {
    display: flex;
  }

  .kg-bookmark-description,
  .kg-bookmark-metadata {
    display: -webkit-box;
    overflow-y: hidden;
    -webkit-box-orient: vertical;
  }

  .kg-bookmark-card + .kg-bookmark-card {
    margin-top: -35px;
  }

  .kg-bookmark-container {
    color: currentColor;
    position: relative;
    min-height: 150px;
    padding-bottom: 0;
    transition: transform .2s ease;
    text-decoration: none;
    background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['25'] : colors.gray['700']};
  }

  .kg-bookmark-container:hover {
    transform: translateY(-4px);
  }

  .kg-bookmark-content {
    align-items: flex-start;
    flex-direction: column;
    flex-grow: 1;
    justify-content: start;
    padding: 20px;
  }

  .kg-bookmark-title {
    ${typography.styles.textMd};
    ${typography.weights.semibold};
  }

  .kg-bookmark-description {
    ${typography.styles.textMd};
    ${typography.weights.regular};

    --max-lines: 2;
    ${utils.maxLines};
  }

  .kg-bookmark-metadata {
    ${typography.styles.textSm};
    ${typography.weights.bold};
    margin-top: 40px;

    --max-lines: 1;
    ${utils.maxLines};
  }

  .kg-bookmark-metadata .kg-bookmark-icon {
    width: 20px;
    height: 20px;
    margin-right: 6px;
    margin-bottom: -5px;
    border-radius: 0;
  }

  .kg-bookmark-metadata span:nth-of-type(2)::before {
    margin-right: 6px;
    margin-left: 6px;
    content: '•';
  }

  .kg-bookmark-thumbnail {
    position: relative;
    min-width: 28%;
    max-height: 100%;
  }

  .kg-bookmark-thumbnail img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
    -o-object-fit: cover;
    object-fit: cover;
    margin: 0;
  }

  /* These classes will be deprecated. Keep them for GScan validation. */
  .kg-bookmark-author,
  .kg-bookmark-publisher {
    display: inline;
  }

  /* Margin Elements */
  iframe,
  .kg-embed-card > div,
  .kg-embed-card > iframe,
  .kg-embed-card > .fb-post,
  .kg-embed-card > .twitter-tweet {
    margin-right: auto !important;
    margin-left: auto !important;
  }
`
