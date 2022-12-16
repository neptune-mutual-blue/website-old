import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { LinkExternal01 } from '../../../components/Icon/variants/General'
import { TeamCarousel } from './TeamCarousel'

export const Team = () => {
  const { t } = useTranslation('about')

  return (
    <Container>
      <ContentContainer>
        <LinkText href='/careers'>
          <span>{t('We’re hiring!')}</span>
          <LinkExternal01 width='16' height='16' />
        </LinkText>

        <Title>{t('Meet Our Team')}</Title>

        <SubHeading>
          {t('We are a global and dynamic team with a mission to create a reliable, fast, and effective platform that protects digital assets.')}
        </SubHeading>
      </ContentContainer>

      <CarouselContainer>
        <TeamCarousel />
      </CarouselContainer>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 360px;

  padding-top: 56px;
  padding-bottom: 96px;
  
  ${utils.fullWidthContainer}
  background-color: ${props => props.theme.isLightMode ? colors.white : colors.gray[800]};
  
  @media screen and (max-width: 768px) {
    margin-top: 64px;
    margin-bottom: 64px;
    padding-bottom: 0;
  }
`

const ContentContainer = styled.div`
  text-align: center;

  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
`

const LinkText = styled.a`
  margin-left: auto;
  margin-right: auto;
  width: max-content;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;

  ${typography.styles.textMd}
  ${typography.weights.semibold}

  color: ${props => props.theme.isLightMode ? colors[primaryColorKey][600] : colors[primaryColorKey]['300']};

  :hover, :active{
    color: ${props => props.theme.isLightMode ? colors[primaryColorKey][600] : colors[primaryColorKey]['300']};
  }
`

const Title = styled.h2`
  margin-top: 12px;
  ${typography.styles.displayMd}
  ${typography.weights.semibold}

  @media (max-width: 768px) {
    ${typography.styles.displaySm}
  }
`

const SubHeading = styled.p`
  margin-top: 20px;
  
  ${typography.styles.textXl}
  ${typography.weights.regular}
  color: ${props => props.theme.isLightMode ? colors.gray[600] : colors.gray[25]};

  @media (max-width: 768px) {
    ${typography.styles.textLg}
  }
`

const CarouselContainer = styled.div`
  margin-top: 64px;
`
