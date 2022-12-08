import { Listbox } from '@headlessui/react'
import React from 'react'
import styled from 'styled-components'
import { colors, primaryColorKey } from '../../styles/colors'
import { shadows } from '../../styles/shadows'
import { typography } from '../../styles/typography'
import { utils } from '../../styles/utils'
import { Icon } from './Icon'

export const Filter = ({ options, selectedOption, setSelectedOption, label, iconVariant, defaultOption, getOptionText = (x) => x, filterlabelposition = 'side' }) => {
  return (
    <Container filterlabelposition={filterlabelposition}>
      <Listbox value={selectedOption} onChange={setSelectedOption}>
        <FilterLabel>{label}</FilterLabel>
        <ButtonContainer>
          <ListboxButton filterlabelposition={filterlabelposition}>
            <Left>
              {iconVariant && <Icon variant={iconVariant} size={20} />}
              <span>{getOptionText(selectedOption) || defaultOption}</span>
            </Left>
            <Right>
              <Icon variant='chevron-down' size={20} />
            </Right>
          </ListboxButton>
          <ListboxOptions>
            {options.map((option) => (
              <ListboxOption key={option} value={option}>
                {({ active, selected }) => (
                  <OptionContent data-active={active.toString()}>
                    <Left>
                      {iconVariant && <Icon variant={iconVariant} size={20} />}
                      <span>{getOptionText(option) || defaultOption}</span>
                    </Left>
                    {selected && (
                      <Right>
                        <Icon variant='check' size={20} />
                      </Right>
                    )}

                  </OptionContent>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </ButtonContainer>
      </Listbox>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: ${props => {
    if (props.filterlabelposition === 'top') {
      return 'column'
    }
    return 'row'
  }};
  justify-content: ${props => {
    if (props.filterlabelposition === 'top') {
      return 'flex-start'
    }
    return 'flex-end'
  }};
  align-items: ${props => {
    if (props.filterlabelposition === 'top') {
      return ''
    }
    return 'center'
  }};
  
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const FilterLabel = styled(Listbox.Label)`
  color: ${props => props.theme.isLightMode ? colors.gray['500'] : colors.white};

  ${typography.styles.textMd};
  ${typography.weights.medium};

  @media (max-width: 768px) {
    ${utils.srOnly};
  }
`

const ListboxButton = styled(Listbox.Button)`
  width: ${props => {
    if (props.filterlabelposition === 'top') {
      return '100%'
    }
    return '240px'
  }};

  display: flex;
  align-items: center;
  padding: 10px 14px;
  gap: 8px;

  border: 1px solid ${props => props.theme.isLightMode ? colors.gray['300'] : colors.gray['700']};
  background-color:  ${props => props.theme.isLightMode ? colors.white : colors.gray['700']};
  box-shadow: ${shadows.xs};
  border-radius: 8px;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
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
`

const ListboxOptions = styled(Listbox.Options)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  padding: 6px;

  background-color:  ${props => props.theme.isLightMode ? colors.white : colors.gray['700']};
  border: 1px solid ${props => props.theme.isLightMode ? colors.gray['200'] : colors.gray['600']};
  box-shadow: ${shadows.lg};
  border-radius: 8px;

  outline: none;
  list-style: none;
  width: 100%;
`

const ListboxOption = styled(Listbox.Option)``

const OptionContent = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 8px;
  gap: 8px;
  border-radius: 6px;

  &[aria-selected="true"] ${Right} svg {
    color:  ${props => props.theme.isLightMode ? colors[primaryColorKey]['500'] : colors[primaryColorKey]['600']};
  }
  
  &[data-active="true"], :hover {
    background-color: ${props => props.theme.isLightMode ? colors.gray['50'] : colors.gray['600']};
  }
`
