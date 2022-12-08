import { useState } from 'react'
import styled from 'styled-components'
import { Filter } from '../../../components/Filter'
import { VacancyCard } from './VacancyCard'

export const VacanciesList = ({ vacancies, departments }) => {
  const [selectedOption, setSelectedOption] = useState(departments[0])

  const filtered = selectedOption ? vacancies.filter(vacancy => vacancy.department === selectedOption) : vacancies
  console.log(departments)
  return (
    <Container>
      <Filter
        options={departments}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        label='Filter by Department'
        iconVariant='users-01'
        defaultOption='Any Department'
      />
      {filtered.map(vacancy => {
        return (
          <VacancyCard key={vacancy.id} vacancy={vacancy} />
        )
      })}
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`
