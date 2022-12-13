import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../styles/colors'
import { shadows } from '../../../styles/shadows'
import { typography } from '../../../styles/typography'

export const InputWithLabel = ({ children, placeholder, label, error, ...props }) => {
  return (
    <Container>
      <Label>
        {label}
      </Label>
      <StyledInput data-error={error ? 'true' : 'false'} placeholder={placeholder} {...props} />

      {/* Hint as children */}
      {children}
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width:100%;
`

const Label = styled.label`
  flex: 1;
  margin-bottom: 6px;

  ${typography.styles.textSm};
  ${typography.weights.medium};
  color: ${props => props.theme.isLightMode ? colors.gray['700'] : colors.white};
`

const StyledInput = styled.input`
  display: flex;
  width: 100%;
  background-color: ${props => props.theme.isLightMode ? props.theme.primaryBackgroundColor : colors.gray[600]};
  border: 1px solid ${props => props.theme.isLightMode ? colors.gray['300'] : colors.gray['500']};
  box-shadow: ${shadows.xs};
  border-radius: 8px;  
  padding: 12px 14px;
  gap: 8px;
  ${typography.styles.textMd};
  ${typography.weights.regular};

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${props => props.theme.isLightMode ? colors.gray['500'] : colors.gray['300']};
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: ${props => props.theme.isLightMode ? colors.gray['500'] : colors.gray['300']};
  }

  ::-ms-input-placeholder { /* Microsoft Edge */
    color: ${props => props.theme.isLightMode ? colors.gray['500'] : colors.gray['300']};
  }

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
  }

  &[data-error="true"] {
    border: 1px solid ${colors.error[700]};
  }
`
