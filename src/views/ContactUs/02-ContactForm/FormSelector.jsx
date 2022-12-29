import React, { forwardRef, useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Icon } from '../../../components/Icon'
import { colors, primaryColorKey } from '../../../../styles/colors'
import { shadows } from '../../../../styles/shadows'
import { typography } from '../../../../styles/typography'

const FormSelector = forwardRef(({
  options,
  placeholder,
  label,
  error,
  onChange,
  reset,
  ...props
},
ref
) => {
  const theme = useTheme()
  const [filteredOptions, setFilteredOptions] = useState(options)
  const [selectedOptions, setSelectedOptions] = useState([])

  const getIconName = (_option) => {
    return (!theme.isLightMode && _option.iconVariantDark)
      ? _option.iconVariantDark
      : _option.iconVariant
  }

  const handleOptionSelect = _option => {
    const _filteredOptions = [...filteredOptions]
    const optionIndex = _filteredOptions.findIndex(o => o.value === _option.value)
    _filteredOptions[optionIndex].selected = !_filteredOptions[optionIndex].selected
    setFilteredOptions([..._filteredOptions])

    const _selectedOptions = _filteredOptions.filter(o => o.selected)
    setSelectedOptions([..._selectedOptions])

    onChange(_selectedOptions)
  }

  const handleOptionRemove = _option => {
    const _filteredOptions = [...filteredOptions]
    const _optionIndex = _filteredOptions.findIndex(o => o.value === _option.value)
    _filteredOptions[_optionIndex].selected = false
    setFilteredOptions(_filteredOptions)

    const _selectedOptions = _filteredOptions.filter(o => o.selected)
    setSelectedOptions([..._selectedOptions])

    onChange(_selectedOptions)
  }

  useEffect(() => {
    if (reset) {
      setFilteredOptions(prev => {
        const _filteredOptions = [...prev].map(option => ({ ...option, selected: false }))
        return [..._filteredOptions]
      })
      setSelectedOptions([])
    }
  }, [reset])

  return (
    <Container>
      <Label>
        {label}
      </Label>

      <DisplayContainer
        data-error={(error) ? 'true' : 'false'}
        {...props}
      >
        {
          selectedOptions?.length
            ? selectedOptions.map((o, i) => (
              <DisplayOption key={i}>
                <>
                  <Icon variant={getIconName(o)} size={20} />
                  <span>{o.text}</span>
                </>
                <CloseButton
                  type='button'
                  onClick={() => handleOptionRemove(o)}
                >
                  <Icon variant='x-close' size={16} />
                </CloseButton>
              </DisplayOption>
            ))
            : (
              <Placeholder>
                {placeholder}
              </Placeholder>
              )
        }
      </DisplayContainer>

      {(error) && <ErrorText>{error}</ErrorText>}

      <OptionsContainer>
        {
          filteredOptions.map((o, i) => (
            <SelectOption
              key={i}
              onClick={() => handleOptionSelect(o)}
              data-isselected={o.selected}
              type='button'
              ref={i === 0 ? ref : null}
            >
              <Icon variant={getIconName(o)} size={20} />
              <span>{o.text}</span>
              {o.selected
                ? (
                  <CheckFilled>
                    <Icon variant='check' size={10} />
                  </CheckFilled>
                  )
                : <PlaceholderCircle />}
            </SelectOption>
          ))
        }
      </OptionsContainer>
    </Container>
  )
})

FormSelector.displayName = 'FormSelector'

export { FormSelector }

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width:100%;
`

const Label = styled.p`
  flex: 1;
  margin-bottom: 6px;

  ${typography.styles.textSm};
  ${typography.weights.medium};
  color: ${props => props.theme.isLightMode ? colors.gray[700] : colors.gray[300]};
`

const DisplayContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  background-color: ${props => props.theme.isLightMode ? props.theme.primaryBackgroundColor : colors.gray[600]};
  border: 1px solid ${props => props.theme.isLightMode ? colors.gray['300'] : colors.gray['500']};
  box-shadow: ${shadows.xs};
  border-radius: 8px;  
  padding: 10px 14px;
  gap: 6px;
  ${typography.styles.textSm};
  ${typography.weights.medium};
  
  &:not(&:disabled) {
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

const ErrorText = styled.p`
  margin-top:6px;
  ${typography.styles.textSm}
  ${typography.weights.regular}

  color: ${props => props.theme.isLightMode ? colors.error[800] : colors.error[600]};

  &:empty {
    display: none;
  }
`

const OptionsContainer = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 8px;
  
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2,1fr);
  }
`

const DisplayOption = styled.div`
  padding: 2px 4px 2px 9px;
  height: 24px;
  box-sizing: border-box;
  border: 1px solid ${props => props.theme.isLightMode ? colors.gray['300'] : colors.gray['500']};
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 8px;

  color: ${props => props.theme.isLightMode ? colors.gray[700] : colors.white};
  background-color: ${props => props.theme.isLightMode ? 'transparent' : colors.gray[800]};
`

const SelectOption = styled.button`
  padding: 8px 16px;
  display: flex;
  gap: 8px;
  align-items: center;
  background-color: ${props => props.theme.isLightMode ? props.theme.primaryBackgroundColor : colors.gray[600]};
  border: 1px solid ${props => props.theme.isLightMode ? colors.gray['300'] : colors.gray['500']};
  box-shadow: ${shadows.xs};
  border-radius: 8px;  
  ${typography.styles.textMd};
  ${typography.weights.medium};
  color: ${props => props.theme.isLightMode ? colors.gray[700] : colors.white};
  cursor: pointer;
  
  &[data-isselected="true"] {
    border: 1px solid ${props => props.theme.isLightMode ? colors[primaryColorKey][600] : 'transparent'};
    color: ${props => props.theme.isLightMode ? colors.gray[700] : colors.gray[900]};
    background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey][50] : colors.gray[300]};
  }
`

const CheckFilled = styled.div`
  padding: 3px;
  display: flex;
  align-items: center;
  border-radius: 50%;
  background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey][600] : colors.gray[900]};
  margin-left: auto;

  svg {
    color: white;
  }
`

const PlaceholderCircle = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid ${colors.gray[300]};
  margin-left: auto;
  background-color: ${props => props.theme.isLightMode ? 'transparent' : colors.white};
`

const CloseButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${colors.gray[400]}
  }
`

const Placeholder = styled.div`
  color: ${props => props.theme.isLightMode ? colors.gray['500'] : colors.gray['300']};
  ${typography.styles.textMd}
  ${typography.weights.regular}
`
