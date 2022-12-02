import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { colors } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { Card } from '../../Home/03-WhatsNew/Card'
import { Pagination } from './Pagination'
import { TabsContainer } from './TabsContainer'

export const BLOGS_PER_PAGE = 6

const tabs = [
  'all',
  'weekly report',
  'monthly review',
  'exploit analysis',
  'press room'
]

export const RecentPosts = ({ blogPosts }) => {
  const [page, setPage] = useState(0)
  const [isLast, setIsLast] = useState(false)
  const [selectedTab, setSelectedTab] = useState('all')

  const { query, replace } = useRouter()

  const queryPageNum = query.page - 1 || page

  const getPageNumbers = () => {
    const actualDividend = parseInt(blogPosts.length / BLOGS_PER_PAGE)
    if (blogPosts.length % BLOGS_PER_PAGE === 0) {
      return actualDividend
    }

    return actualDividend + 1
  }

  const totalPages = getPageNumbers()

  useEffect(() => {
    if (BLOGS_PER_PAGE * (page + 1) >= blogPosts.length - 1) {
      return setIsLast(true)
    }
    if (BLOGS_PER_PAGE * (page + 1) <= blogPosts.length - 1) {
      return setIsLast(false)
    }
  }, [blogPosts.length, page])

  const handlePrev = () => {
    if (page > 0) {
      setPage((prev) => prev - 1)
      replace(
        {
          query: {
            ...query,
            page: page
          }
        },
        undefined,
        {
          shallow: true
        }
      )
    }
  }

  const handleNext = () => {
    setPage((prev) => prev + 1)
    replace(
      {
        query: {
          ...query,
          page: page + 2
        }
      },
      undefined,
      {
        shallow: true
      }
    )
  }

  return (
    <Container>
      <InnerContainer>
        <TabsContainer tabs={tabs} selectedTab={selectedTab} onTabClick={(tab) => { setSelectedTab(tab) }} />
        <TextAndCta>
          <TextContainer>
            <Heading>Recent Posts</Heading>

          </TextContainer>
        </TextAndCta>

        <BlogsContainer>
          {blogPosts.slice(page * BLOGS_PER_PAGE, BLOGS_PER_PAGE + page * BLOGS_PER_PAGE).map((post) => (
            <SingleCard key={post.id}>
              <Card post={post} />
            </SingleCard>
          ))}
        </BlogsContainer>

        <Pagination page={queryPageNum} setPage={setPage} isLast={isLast} handleNext={handleNext} handlePrev={handlePrev} totalPages={totalPages} />
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  ${utils.fullWidthContainer};
`

const InnerContainer = styled.div`
  border-top: 1px solid ${props => props.theme.isLightMode ? colors.gray['300'] : colors.gray['700']};
  padding-bottom: 96px;

  @media (max-width: 768px) {
    padding-top: 28px;
    padding-bottom: 64px;
  }
`

const TextAndCta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const TextContainer = styled.div`
  max-width: 768px;
`

const Heading = styled.h2`
  color: ${(props) => props.theme.color};

  ${typography.styles.displayXs};
  ${typography.weights.semibold};

  @media (max-width: 768px) {
    ${typography.styles.displaySm};
    ${typography.weights.semibold};
  }
`

const BlogsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin-top: 32px;
`
const SingleCard = styled.div`
  max-width: 384px;
  height: 468px;
`
