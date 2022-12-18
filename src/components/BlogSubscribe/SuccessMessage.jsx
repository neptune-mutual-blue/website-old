import styled from 'styled-components'
import { colors } from '../../../styles/colors'
import { typography } from '../../../styles/typography'
import { Icon } from '../Icon'

export const SuccessMessage = () => {
  return (
    <Container>
      <Icon variant='check-circle-broken' size={20} />

      <p>We have sent email confirmation. Please confirm to receive our newsletter.</p>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 6px;

  display: flex;
  align-items: flex-start;
  gap: 12px;


  color: ${props => props.theme.isLightMode ? colors.success['600'] : colors.success['600']};
  border-radius: 4px;
  ${typography.styles.textMd}
  ${typography.weights.regular}

  svg {
    flex-shrink: 0;
  }
`
