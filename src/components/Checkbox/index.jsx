import React from 'react'
import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../styles/colors'
import { shadows } from '../../../styles/shadows'
import { typography } from '../../../styles/typography'

export const Checkbox = React.forwardRef(
  ({ id, name, children, ...inputProps }, ref) => {
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
  ${typography.weights.medium}
`

const Check = styled.input`
  width: 20px;
  height: 20px;
  background: white;
  border: 1px solid ${colors['gray-blue'][300]};
  border-radius: 6px;
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

  &:not(&:disabled) {
    &[data-state="hover"], :hover {
        
    }

    &[data-state="focussed"],
    :focus,
    :active,
    :focus-visible {

      outline: none;
      box-shadow: ${shadows.xs},
        0px 0px 0px 4px ${(props) => props.theme.isLightMode ? colors[primaryColorKey]['100'] : colors[primaryColorKey]['800']};
    }

    &:checked{
        background-color: ${colors[primaryColorKey][100]}
    }
  }
`

//   input[type='checkbox']:checked.checkbox_custom {
//     background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3E%3C/svg%3E");
//     background-color: currentColor;
//     border-color: transparent;
//   }
