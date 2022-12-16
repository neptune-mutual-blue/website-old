import Link from 'next/link'
import styled from 'styled-components'

import {
  colors,
  primaryColorKey
} from '../../../styles/colors'
import { typography } from '../../../styles/typography'

export const FilterTabs = ({ filters, activeFilter, mapUrl = (x) => x }) => {
  return (
    <Container>
      {
        filters.map((f, i) => (
          <FilterItem
            key={i}
            data-is-active={activeFilter === f.value}
            href={mapUrl(f.value)}
            scroll={false}
          >
            {f.text}
          </FilterItem>
        ))
      }
    </Container>
  )
}

const Container = styled.div`
  margin: 32px auto;
  display: flex;
  gap: 8px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const FilterItem = styled(Link)`
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  ${typography.styles.textSm};
  ${typography.weights.semibold};

  color: ${props => props.theme.isLightMode ? colors.gray[500] : colors.gray[300]};
  
  &[data-is-active='true'] {
    color: ${props => props.theme.isLightMode ? colors[primaryColorKey][700] : colors.white};
    background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey][50] : colors[primaryColorKey][700]};
  }

  :hover{
    color: ${props => props.theme.isLightMode ? colors.gray[500] : colors.gray[300]};
  }
`
