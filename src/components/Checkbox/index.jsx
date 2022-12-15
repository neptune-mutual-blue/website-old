import React from 'react'
import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../styles/colors'
import { shadows } from '../../../styles/shadows'
import { typography } from '../../../styles/typography'

export const Checkbox = React.forwardRef(
  ({ id = 'checkbox', name, children, ...inputProps }, ref) => {
    return (
      <Container>
        <Check
          ref={ref}
          id={id}
          name={name}
          type='checkbox'
          {...inputProps}
        />

        <Label htmlFor={id} className='ml-3 align-middle'>
          {children}
        </Label>
      </Container>
    )
  }
)

Checkbox.displayName = 'Checkbox'

const Container = styled.div`
  display: flex;
`

const Label = styled.label`
  margin-left: 12px;
  ${typography.styles.textMd}
  ${typography.weights.regular}
  color: ${props => props.theme.isLightMode ? colors.gray[600] : colors.gray[300]};
`

const Check = styled.input`
  appearance: none;
  padding: 0;
  print-color-adjust: exact;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  user-select: none;
  flex-shrink: 0;
  background-repeat: no-repeat;
  background-position: center;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 1px solid ${props => props.theme.isLightMode ? colors.gray[300] : colors[primaryColorKey][600]};
  background-color: ${props => props.theme.isLightMode ? 'transparent' : colors[primaryColorKey][50]};
  
  &:focus,
  &:active,
  &:focus-visible {
    outline: none;
    box-shadow: ${shadows.xs},
      0px 0px 0px 4px ${(props) => props.theme.isLightMode ? colors[primaryColorKey]['100'] : colors[primaryColorKey]['800']};
  }

  &:hover,
  & + label:hover {
    border-color: rgb(130, 130, 130);
  }

  background-position: center;
  background-repeat: no-repeat;
  &:checked {
    background-image: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.6663 3.5L5.24967 9.91667L2.33301 7' stroke='%23444CE7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  }
`
