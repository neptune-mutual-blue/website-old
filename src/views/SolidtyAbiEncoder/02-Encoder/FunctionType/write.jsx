import { useId } from 'react'

import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../../styles/colors'
import { InputWithLabel } from '../../../../components/InputWithLabel'
import { Button } from '../../../../components/Button'
import { typography } from '../../../../../styles/typography'

const placeHoldersSamples = {
  uint256: 111222333,
  bytes32: '0x112233',
  address: '0x11...22'
}

const WriteContract = (props) => {
  const id = useId()

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

      <Btn hierarchy='primary' size='sm'>Write</Btn>

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
  ${typography.weights.semibold}
  ${typography.styles.textSm}
`

export { WriteContract }
