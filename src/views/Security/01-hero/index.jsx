import Image from 'next/image'
import styled from 'styled-components'

import { useTranslation } from 'react-i18next'

import { colors, primaryColorKey } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'

const Hero = () => {
  const { t } = useTranslation('security')

  return (
    <Container>
      <InnerContainer>
        <Content>
          <Subheader>{t('HEADER_TAG')}</Subheader>
          <HeaderTitle>{t('HEADER_TITLE')}</HeaderTitle>
          <HeaderContent>
            {t('HEADER_TEXT')}
          </HeaderContent>
        </Content>
        <ImageContainer>
          <Image alt='' src='/assets/images/hero/shield.webp' width='306' height='306' />
        </ImageContainer>

      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['25'] : colors.gray['900']};
`

const InnerContainer = styled.div`
  display: flex;
  ${utils.fullWidthContainer};
  justify-content: start;
  padding-top: 100px;
  padding-bottom: 100px;

  @media (max-width: 768px) {
    padding-top: 56px;
    padding-bottom: 48px;
    flex-direction: column;
    align-items: stretch;
  }
`

const Content = styled.div`
  width: 768px;
  margin-right: 91px;

  @media (max-width: 768px) {
    width: auto;
    margin-right: 0;
  }
`

const Subheader = styled.span`
  color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['700'] : colors[primaryColorKey]['500']};
  ${typography.weights.semibold}
  ${typography.styles.textMd}
  margin-bottom: 12px;
  display: block;

  @media (max-width: 768px) {
    ${typography.styles.textSm}
  }

`
const HeaderTitle = styled.h1`
  color: ${props => props.theme.color};
  margin-bottom: 24px;
  ${typography.styles.displayLg}
  ${typography.weights.semibold}


  @media (max-width: 768px) {
    ${typography.styles.displayMd};
  }
`

const HeaderContent = styled.p`
  color: ${props => props.theme.secondaryColor};
  ${typography.styles.textXl}
  ${typography.weights.regular}

  @media (max-width: 768px) {
    ${typography.styles.textLg}
    margin-bottom: 84px;
  }
`

const ImageContainer = styled.div`
  text-align: center;
`

export { Hero }
