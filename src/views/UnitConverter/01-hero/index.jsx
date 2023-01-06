import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'

export const Hero = () => {
  const { t } = useTranslation('ethereum-unit-converter')

  return (
    <Container>
      <InnerContainer>
        <Text>
          <Heading>{t('Ethereum Unit Converter Online')}</Heading>
          <Subtitle>{t('Ether or ETH is often used in different denominations of its currency, such as Wei for interacting with smart contracts and Gwei for calculating gas prices. Use our Unit Converter to easily convert between them!')}</Subtitle>
        </Text>
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding-top: 96px;
  padding-bottom: 96px;
  background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['25'] : colors.gray['900']};
  @media (max-width: 768px) {
    padding-top: 64px;
    padding-bottom: 64px;
    gap: 32px;
  }
`

const InnerContainer = styled.div`
  ${utils.fullWidthContainer};
`

const Text = styled.div`
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  @media (max-width: 768px) {
    text-align: left;
  }
`

const Heading = styled.h1`
  margin-top: 12px;
  ${typography.styles.displayLg};
  ${typography.weights.semibold};
  @media (max-width: 768px) {
    ${typography.styles.displayMd};
    ${typography.weights.semibold};
  }
`

const Subtitle = styled.p`
  margin: 24px auto 0 auto;
  max-width: 768px;
  color: ${(props) => props.theme.secondaryColor};
  ${typography.styles.textXl};
  ${typography.weights.regular};
  @media (max-width: 768px) {
    margin-top: 16px;
    ${typography.styles.textLg};
    ${typography.weights.regular};
  }
`
