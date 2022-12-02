import styled from 'styled-components'
import { colors } from '../../../../styles/colors'
import { LinkGrayButton } from '../../../components/Button/LinkGrayButton'
import { PageNumbers } from './PageNumbers'

export const Pagination = ({ page = 0, setPage, isLast, handlePrev, handleNext, totalPages }) => {
  const getPageNumbers = () => {
    return [...Array(totalPages).keys()]
  }

  const pages = getPageNumbers()

  return (
    <Container>
      <PaginationContainer>

        <LinkGrayButton onClick={handlePrev} iconLeading iconVariant='arrow-left' disabled={page === 0}>Previous</LinkGrayButton>

        <PageNumbers page={page} pages={pages} setPage={setPage} />

        <LinkGrayButton onClick={handleNext} iconTrailing iconVariant='arrow-right' disabled={isLast}>Next</LinkGrayButton>

      </PaginationContainer>
    </Container>
  )
}

const Container = styled.div`
  padding-top: 96px;
  padding-bottom: 96px;

  @media (max-width: 768px) {
    padding-top: 64px;
    padding-bottom: 64px;
  }
`

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid ${(props) => props.theme.isLightMode ? colors.gray[200] : colors.gray[700]};
`
