import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { utils } from '../../../styles/utils'
import { TableOfContents } from '../../components/BlogDetails/TableOfContents'
import { Shareit } from '../../components/Shareit'
import { BlogHero } from './BlogHero'
import { Content } from './Content'

export const BlogPost = (props) => {
  const [timeToRead, setTimeToRead] = useState('0 min')

  useEffect(() => {
    if (process.browser) {
      const wpm = 225
      const text = document.getElementsByClassName('article')[0].innerText

      const words = text.trim().split(/\s+/).length
      const time = Math.ceil(words / wpm)

      setTimeToRead(`${time} min`)
    }
  }, [])

  const wrapperClass = 'article'
  return (
    <>
      <BlogHero title={props.post.title} featuredImage={props.post.image} createdAt={props.post.date} timeToRead={timeToRead} />
      <MainWrapper>
        <Sidebar>
          <TableOfContents title={props.post.title} wrapperClass={wrapperClass} />
          <Shareit title={props.post.title} intro={props.post.intro} />
        </Sidebar>

        <ContentWrapper>
          <Content content={props.post.content.html} wrapperClass={wrapperClass} />
        </ContentWrapper>

      </MainWrapper>

    </>
  )
}

const MainWrapper = styled.div`
  margin: auto 80px;
  padding-left: 86px;
  padding-right: 86px;
  padding-bottom: 96px;
  display: grid;
  gap: 64px;
  grid-template-columns: 4fr 9fr;
  
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column-reverse;

    margin: auto;
    padding-left: 0;
    padding-right: 0;
    ${utils.fullWidthContainer};
  }
`

const Sidebar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  @media (max-width: 1024px) {
    padding-bottom: 96px;
  }
  
`

const ContentWrapper = styled.div`
  /* grid-template-columns: 4fr; */
`
