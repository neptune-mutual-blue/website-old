import styled from 'styled-components'

import { getSlug } from '../../../../services/helpers/slug'
import {
  colors,
  primaryColorKey
} from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'

export const Hero = ({ title }) => {
  return (
    <Container>
      <InnerContainer>
        <Title id={getSlug(title)}>
          {title}
        </Title>
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['25'] : colors.gray['900']};
`

const InnerContainer = styled.div`
  padding: 96px 0;
  ${utils.fullWidthContainer}
  text-align: center;
  
  @media screen and (max-width: 768px) {
    text-align: left;
  }
`

const Title = styled.h1`
  ${typography.styles.displayLg}
  ${typography.weights.semibold}
  
  @media screen and (max-width: 768px) {
    ${typography.styles.displayMd}
  }
`
