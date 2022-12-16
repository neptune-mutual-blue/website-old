import styled from 'styled-components'
import { Filter } from '../../../../components/Filter'
import { data } from '../data'
import { RadioGroupFilter } from './RadioGroupFilter'

export const EcosystemFilter = ({ types, selectedOption, setSelectedOption }) => {
  return (
    <Container>
      <DesktopFilter>
        <RadioGroupFilter
          options={types}
          getOptionText={type => data.labels[type]}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          // label='Filter by Type'
          defaultOption='All'
        />
      </DesktopFilter>

      <MobileFilter>
        <Filter
          options={types}
          getOptionText={type => data.labels[type]}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          // label='Filter by Type'
          defaultOption='All'
        />
      </MobileFilter>
    </Container>
  )
}

const Container = styled.div`
  text-align: center;
`

const DesktopFilter = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`

const MobileFilter = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`
