import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'

import {
  colors,
  primaryColorKey
} from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'

const Hero = () => {
  const { t } = useTranslation('web3-tools')

  return (
    <Container>
      <InnerContainer>
        <Content>
          <H1>
            <HeaderTitle>
              <Trans t={t}>
                Web3 Tools
              </Trans>
            </HeaderTitle>
          </H1>
        </Content>
      </InnerContainer>
    </Container>
  )
}

const H1 = styled.h1``

const Container = styled.div`
  background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['25'] : colors.gray['900']};
  position: relative;
`

const InnerContainer = styled.div`
  padding: 96px 0;

  ${utils.fullWidthContainer};
`

const Content = styled.div`
  padding: 0 96px;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 0px;
    text-align: left;
  }
`

const HeaderTitle = styled.div`
  color: ${props => props.theme.color};
  margin-bottom: 24px;
  ${typography.styles.displayLg}
  ${typography.weights.semibold}


  @media (max-width: 768px) {
    ${typography.styles.displayMd};
  }
`

export { Hero }
