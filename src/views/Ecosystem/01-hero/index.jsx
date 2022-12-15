import Image from 'next/image'
import styled from 'styled-components'

import { colors } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import CheckIcon from '../../../components/Icon/custom/CheckIcon'
import { getBlurDataURL } from '../../../helpers/images'

export const Hero = () => {
  return (
    <Container>
      <InnerContainer>
        <TextAndFeatures>
          <TextContainer>
            <Heading>Neptune Mutual Ecosystem</Heading>
            <SupportingText>Neptune Mutual is designed to protect your project from any potential hacking or security issues. Make sure your community is aware of the advantages of a parametric insurance model. Unlike other insurance products, policyholders do not need to request another user to confirm their proof of loss.</SupportingText>
          </TextContainer>

          <Features>
            <Feature>
              <CheckIcon /> <span>Liquidity providers</span>
            </Feature>
            <Feature>
              <CheckIcon /> <span>Policyholders</span>
            </Feature>
            <Feature>
              <CheckIcon /> <span>Cover creators</span>
            </Feature>
          </Features>
        </TextAndFeatures>

        <ImageContainer>
          <Image
            src='/assets/images/hero/ecosystem.png'
            alt='ecosystem'
            fill
            sizes='(max-width: 768px) 100vw, 1280px'
            placeholder='blur'
            blurDataURL={getBlurDataURL(1280, 720)}
          />
        </ImageContainer>

      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  padding-top: 96px;
  padding-bottom: 32px;

  @media (max-width: 768px) {
    padding-top: 64px;
    padding-bottom: 24px;
  }
`

const InnerContainer = styled.div`
  ${utils.fullWidthContainer};
`

const TextAndFeatures = styled.div`
  display: flex;
  gap: 32px;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const TextContainer = styled.div`
  max-width: 768px;
`

const Heading = styled.h1`
  color: ${(props) => props.theme.color};

  ${typography.styles.displayXL};
  ${typography.weights.semibold};

  @media (max-width: 768px) {
    ${typography.styles.displayMd};
    ${typography.weights.semibold};
  }
`

const SupportingText = styled.p`
  margin-top: 24px;
  color: ${(props) => props.theme.secondaryColor};

  ${typography.styles.textLg};
  ${typography.weights.regular};

  @media (max-width: 768px) {
    margin-top: 16px;
    ${typography.styles.textMd};
    ${typography.weights.regular};
  }
`

const ImageContainer = styled.div`
  position: relative;
  margin-top: 64px;
  height: 480px;
  border-radius: 16px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 272px;
    border-radius: 0px;
    max-width: none;
    margin-left: -16px;
    margin-right: -16px;
  }

  img {
    object-fit: cover;
  }
`

const Features = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 24px 16px;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 0px 0px 0px 8px;
  }
`

const Feature = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;

  svg {
    --background: ${props => props.theme.isLightMode ? colors.success['100'] : colors.gray['600']};
    --color: ${props => props.theme.isLightMode ? colors.success['500'] : colors.success['500']};
  }
`
