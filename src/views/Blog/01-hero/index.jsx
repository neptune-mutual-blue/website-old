import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import {
  colors,
  primaryColorKey
} from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { BlogSubscribe } from '../../../components/BlogSubscribe'

export const Hero = () => {
  const { t } = useTranslation('blog')

  return (
    <Container>
      <InnerContainer>
        <Text>
          <H1 id='neptune-mutual-blog'>
            <Subheader>{t('Recent developments in the decentralized insurance space')}</Subheader>
            <Heading>{t('Neptune Mutual Blog')}</Heading>
          </H1>
          <Subtitle>
            {t('The Neptune Mutual Blog is the go-to location for learning about web3 and smart contract vulnerabilities, decentralized insurance, security best practices, and industry news. Enter your address to get weekly updates.')}
          </Subtitle>
        </Text>

        <FormContainer>
          <BlogSubscribe />
        </FormContainer>

      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
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

const H1 = styled.h1``

const Heading = styled.div`
  margin-top: 12px;
  ${typography.styles.displayLg};
  ${typography.weights.semibold};

  @media (max-width: 768px) {
    ${typography.styles.displayMd};
    ${typography.weights.semibold};
  }
`
const Subheader = styled.div`
  color: ${(props) => props.theme.isLightMode ? colors[primaryColorKey]['700'] : colors[primaryColorKey]['300']};

  ${typography.styles.textMd};
  ${typography.weights.semibold};

  @media (max-width: 768px) {
    ${typography.styles.textSm};
  }
`

const Subtitle = styled.p`
  margin-top: 24px;
  color: ${(props) => props.theme.secondaryColor};
  ${typography.styles.textXl};
  ${typography.weights.regular};

  @media (max-width: 768px) {
    margin-top: 16px;
    ${typography.styles.textLg};
    ${typography.weights.regular};
  }
`

const FormContainer = styled.div`
  margin-top: 40px;
`
