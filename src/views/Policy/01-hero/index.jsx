import Link from 'next/link'
import styled from 'styled-components'

import {
  colors,
  primaryColorKey
} from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'

const Hero = ({ slugs, activeSlug }) => {
  return (
    <Container>
      <InnerContainer>
        <Title>Policies</Title>

        <HorizontalTabs>
          {
            slugs.map(({ slug, title }, i) => (
              <Tab
                key={i} href={`/policies/${slug}`}
                isactive={(activeSlug === slug) ? 'true' : 'false'}
              >
                {title}
              </Tab>
            ))
          }
        </HorizontalTabs>
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['25'] : colors.gray['900']};
`

const InnerContainer = styled.div`
  ${utils.fullWidthContainer}
  padding-top: 96px;
`

const Title = styled.h1`
  ${typography.styles.displayLg}
  ${typography.weights.semibold}
`

const HorizontalTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 56px;
  padding-bottom: 16px;

  overflow-x: auto;
`

const Tab = styled(Link)`
  padding: 8px 12px;
  ${typography.styles.textSm}
  ${typography.weights.semibold}
  border-radius: 6px;
  color: ${props => props.theme.isLightMode ? colors.gray[500] : colors.gray[300]};
  white-space: nowrap;

  &[isactive="true"] {
    background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey][100] : colors.gray[600]};
    color: ${props => props.theme.isLightMode ? colors[primaryColorKey][700] : colors.white};
  }
  :hover[isactive=false]{
    background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey][50] : colors.gray[600]};
    color: ${props => props.theme.isLightMode ? colors[primaryColorKey][700] : colors.white};
  }
`

export { Hero }
