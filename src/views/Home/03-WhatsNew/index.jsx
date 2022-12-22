import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { Button } from '../../../components/Button'
import { CSSCarousel } from './CSSCarousel'

export const WhatsNew = ({ blogPosts }) => {
  const { t } = useTranslation('home')
  const { t: commonT } = useTranslation('common')

  return (
    <Container>
      <InnerContainer>
        <TextAndCta>
          <TextContainer>
            <Heading id='whats-new'>{t('What’s New?')}</Heading>
            <SupportingText>{t('The latest news, updates, and announcements from our team.')}</SupportingText>
          </TextContainer>

          <ButtonContainer>
            <Button
              href='/blog'
              as={Link}
              hierarchy='primary'
              size='xl'
            >
              {commonT('View All Posts')}
            </Button>
          </ButtonContainer>

          <CarouselContainer>
            <CSSCarousel posts={blogPosts} />
          </CarouselContainer>
        </TextAndCta>
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  padding-top: 96px;
  padding-bottom: 96px;

  @media (max-width: 768px) {
    padding-top: 0px;
    padding-bottom: 64px;
  }
`

const InnerContainer = styled.div`
  ${utils.fullWidthContainer};
`

const TextAndCta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 48px;
  }
`

const TextContainer = styled.div`
  max-width: 768px;
`

const Heading = styled.h2`
  color: ${(props) => props.theme.color};

  ${typography.styles.displayMd};
  ${typography.weights.semibold};

  @media (max-width: 768px) {
    ${typography.styles.displaySm};
    ${typography.weights.semibold};
  }
`

const SupportingText = styled.p`
  margin-top: 20px;
  color: ${(props) => props.theme.secondaryColor};

  ${typography.styles.textXl};
  ${typography.weights.regular};

  @media (max-width: 768px) {
    margin-top: 16px;
    ${typography.styles.textLg};
    ${typography.weights.regular};
  }
`

const ButtonContainer = styled.div`
  @media (max-width: 768px) {
    order: 2;
  }
`

const CarouselContainer = styled.div`
  width: 100%;

  @media (max-width: 768px) {
    order: 1;
  }
`
