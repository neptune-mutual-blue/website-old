import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import {
  colors,
  primaryColorKey
} from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { getBlurDataURL } from '../../../helpers/images'

const Hero = () => {
  const { t } = useTranslation('careers')

  return (
    <Container>
      <InnerContainer>
        <Content>
          <H1>
            <SubheadingWithBadge>
              <Subheading>{t('DeFi Insurance is the Future!')}</Subheading><Badge>{t("We're Hiring!")}</Badge>
            </SubheadingWithBadge>
            <HeaderTitle>{t('Interested in Pursuing a Career with Neptune Mutual?')}</HeaderTitle>
          </H1>
          <HeaderContent>
            {t('If you are driven, passionate and an executor, then Neptune Mutual is for you!')}<br /><br />
            {t('We are looking for amazing talents anywhere across the globe to join our diverse and dynamic team that is on a mission to build a reliable, fast and effective platform that protects digital assets.')}<br /><br />
            {t('Hyper-talented experts from all over the world grow and thrive in our super dynamic, connected team. As a dedicated talent-nurturing workspace, we give each of our team members a fun and professional environment for them to do the work they enjoy.')}
          </HeaderContent>
        </Content>
        <ImageContainer>
          <Image
            alt='Neptune Mutual Careers Banner Image' src='/assets/images/hero/careers.webp'
            fill loading='eager' priority
            sizes='(max-width: 768px) 80vw, (max-width: 1280px) 40vw, 640px'
            placeholder='blur'
            blurDataURL={getBlurDataURL(1280, 1280)}
          />
        </ImageContainer>

      </InnerContainer>
    </Container>
  )
}

const H1 = styled.h1``

const SubheadingWithBadge = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 8px;
`

const Badge = styled.div`
  display: inline-flex;
  ${typography.styles.textSm};
  ${typography.weights.medium};
  color: ${props => props.theme.isLightMode ? colors.success[700] : colors.success[400]};
  background: ${props => props.theme.isLightMode ? colors.success[50] : colors.gray[700]};
  padding: 2px 10px;
  border-radius: 16px;
`

const Container = styled.div`
  background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['25'] : colors.gray['900']};
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 128px;
  padding-top: 96px;
  padding-bottom: 96px;
  
  ${utils.fullWidthContainer};
  
  @media (max-width: 768px) {
    gap: 64px;
    padding-top: 64px;
    padding-bottom: 0;
    flex-direction: column;
    align-items: stretch;
  }
`

const Content = styled.div`
  flex: 1;
`

const Subheading = styled.span`
  color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['700'] : colors[primaryColorKey]['300']};
  ${typography.weights.semibold}
  ${typography.styles.textMd}
  display: inline-flex;
`
const HeaderTitle = styled.div`
  margin-top: 12px;
  color: ${props => props.theme.color};
  ${typography.styles.displayLg}
  ${typography.weights.semibold}


  @media (max-width: 768px) {
    ${typography.styles.displayMd};
  }
`

const HeaderContent = styled.p`
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

const ImageContainer = styled.div`
  flex: 1;
  max-width: 100%;
  position: relative;
  display: inline-block;

  @media (max-width: 768px) {
    flex: 1 0 320px;
    height: 320px;
    max-width: none;
    margin-left: -16px;
    margin-right: -16px;
  }

  img {
    object-position: top center;
    object-fit: cover;

    @media (max-width: 768px) {
      object-position: center;
    }
  }
`

export { Hero }
