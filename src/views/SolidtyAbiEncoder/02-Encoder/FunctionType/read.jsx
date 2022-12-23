import { useId, Fragment } from 'react'

import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../../styles/colors'
import { InputWithLabel } from '../../../../components/InputWithLabel'
import { Button } from '../../../../components/Button'
import { Icon } from '../../../../components/Icon'
import { typography } from '../../../../../styles/typography'

const placeHoldersSamples = {
  uint256: 111222333,
  bytes32: '0x112233',
  address: '0x11...22'
}

const ReadContract = (props) => {
  const id = useId()
  console.log(props)
  return (
    <Container>
      {props.func.inputs.map((input, i) => {
        return (
          <InputWithLabel
            key={`input-${i}`}
            label={`${input.name} (${input.type})`}
            placeholder={placeHoldersSamples[input.type]}
            id={`${id}-${i}`}
          />
        )
      })}

      {Array.isArray(props.func.inputs) && props.func.inputs.length > 0 && <Btn hierarchy='secondary'>Query</Btn>}

      {Array.isArray(props.func.inputs) && props.func.inputs.length > 0 && props.func.outputs.map((output, i) => {
        return (
          <Fragment key={`output-${i}`}>
            <Output><Icon variant='L' size={10} />{(output.type)}</Output>
            <ResultContainer>
              <ResultTitle>[<Bold>{props.func.name}</Bold> method Response]</ResultTitle>
              <Result><Icon variant='chevron-right-double' size={18} />{(output.type)}: @TODO</Result>
            </ResultContainer>
          </Fragment>
        )
      })}

    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey][25] : colors.gray[900]};
  padding: 32px 24px;
  gap: 24px;
`
const Btn = styled(Button)`
  width: fit-content;
`
const Output = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${props => props.theme.isLightMode ? colors.gray[900] : colors.gray[900]};
  font-style: italic;
  ${typography.weights.regular}
  ${typography.styles.textSm}
`

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const ResultTitle = styled.span``

const Bold = styled.span`
  ${typography.weights.semibold}
`

const Result = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-style: italic;

  svg {
    color: ${props => props.theme.isLightMode ? colors.success[700] : colors.gray[25]}
  }
`

export { ReadContract }
