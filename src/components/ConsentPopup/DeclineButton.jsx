import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../styles/colors'
import { shadows } from '../../../styles/shadows'
import { typography } from '../../../styles/typography'

export const DeclineButton = (props) => {
  return (
    <Container {...props} />
  )
}

const Container = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  ${typography.styles.textMd};
  ${typography.weights.semibold};
  border: 1px solid currentColor;
  color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['600'] : colors[primaryColorKey]['100']};
  cursor: pointer;

  :hover {
    color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['500'] : colors[primaryColorKey]['200']};
  }

  :focus,
  :active,
  :focus-visible {

  outline: none;
  box-shadow: ${shadows.xs},
    0px 0px 0px 4px ${(props) => props.theme.isLightMode ? colors[primaryColorKey]['100'] : colors[primaryColorKey]['700']};
  }
`
