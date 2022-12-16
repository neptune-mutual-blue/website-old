import { Listbox } from '@headlessui/react'
import React from 'react'
import styled, { useTheme } from 'styled-components'
import { colors, primaryColorKey } from '../../../../styles/colors'
import { shadows } from '../../../../styles/shadows'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { Icon } from '../../../components/Icon'

export const FormOptions = ({
  options,
  selectedOption,
  setSelectedOption,
  label,
  defaultOption,
  getOptionText = (x) => x.text,
  error
}) => {
  const s = selectedOption ?? defaultOption
  const theme = useTheme()
  const selectedIconVariant = (!theme.isLightMode && s.iconVariantDark) ? s.iconVariantDark : s.iconVariant

  return (
    <Container>
      <Listbox value={selectedOption} onChange={setSelectedOption}>
        <FilterLabel>{label}</FilterLabel>
        <ButtonContainer>
          <ListboxButton
            data-error={(error) ? 'true' : 'false'}
            data-default={s.value === ''}
          >
            <Left>
              {selectedIconVariant && <Icon variant={selectedIconVariant} size={20} />}
              <span>{getOptionText(s)}</span>
            </Left>
            <Right>
              <Icon variant='chevron-down' size={20} />
            </Right>
          </ListboxButton>
          <ListboxOptions>
            {options.map((option) => (
              <ListboxOption key={option.text} value={option}>
                {({ active, selected }) => {
                  const optionIconVariant = (!theme.isLightMode && option.iconVariantDark) ? option.iconVariantDark : option.iconVariant
                  return (
                    <OptionContent data-active={active.toString()}>
                      <Left>
                        {optionIconVariant && <Icon variant={optionIconVariant} size={20} />}
                        <span>{getOptionText(option) || getOptionText(defaultOption)}</span>
                      </Left>
                      {selected && (
                        <Right>
                          <Icon variant='check' size={20} />
                        </Right>
                      )}

                    </OptionContent>
                  )
                }}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </ButtonContainer>
      </Listbox>

      {(error) && <ErrorText>{error}</ErrorText>}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const FilterLabel = styled(Listbox.Label)`
  color: ${props => props.theme.isLightMode ? colors.gray['700'] : colors.white};

  ${typography.styles.textSm};
  ${typography.weights.medium};

  @media (max-width: 768px) {
    ${utils.srOnly};
  }
`

const ListboxButton = styled(Listbox.Button)`
  width: 100%;

  display: flex;
  align-items: center;
  padding: 10px 14px;
  gap: 8px;

  border: 1px solid ${props => props.theme.isLightMode ? colors.gray['300'] : colors.gray['500']};
  background-color:  ${props => props.theme.isLightMode ? colors.white : colors.gray['600']};
  box-shadow: ${shadows.xs};
  border-radius: 8px;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
  }

  svg, path {
    --c: ${props => props.theme.isLightMode ? colors.gray['500'] : colors.white};
    color: var(--c);
  }

  
  &[data-default="true"] {
    --color: ${props => props.theme.isLightMode ? colors.gray['500'] : colors.gray['300']};
    color: var(--color);
    
    svg, path {
      color: var(--color);
    }
  }

  &[data-error="true"] {
    border: 1px solid ${colors.error[700]};
  }

  :not(:disabled) {
    :focus,
    :active,
    :focus-visible {

      outline: none;
      box-shadow: ${shadows.xs},
        0px 0px 0px 4px ${(props) => props.theme.isLightMode ? colors[primaryColorKey]['100'] : colors[primaryColorKey]['800']};
    }
  }
`

const Left = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
  min-width: 0;

  svg {
    flex-shrink: 0;
  }

  span {
    ${utils.ellipsis};
  }
`

const Right = styled.div`
  
`

const ButtonContainer = styled.div`
  position: relative;
  width: 100%;
`

const ListboxOptions = styled(Listbox.Options)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  padding: 6px;
  z-index: 1;

  background-color:  ${props => props.theme.isLightMode ? colors.white : colors.gray['700']};
  border: 1px solid ${props => props.theme.isLightMode ? colors.gray['200'] : colors.gray['600']};
  box-shadow: ${shadows.lg};
  border-radius: 8px;

  outline: none;
  list-style: none;
  width: 100%;

  svg, path {
    --c: ${props => props.theme.isLightMode ? colors.gray['500'] : colors.white};
    color: var(--c);
  }
`

const ListboxOption = styled(Listbox.Option)``

const OptionContent = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 8px;
  gap: 8px;
  border-radius: 6px;
  cursor: pointer;

  &[aria-selected="true"] ${Right} svg {
    color:  ${props => props.theme.isLightMode ? colors[primaryColorKey]['500'] : colors[primaryColorKey]['600']};
  }
  
  &[data-active="true"], :hover {
    background-color: ${props => props.theme.isLightMode ? colors.gray['50'] : colors.gray['600']};
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
