import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { getSlug } from '../../../../services/helpers/slug'
import {
  colors,
  primaryColorKey
} from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { Breadcrumbs } from '../../../components/Breadcrumbs'

const Hero = (props) => {
  const { t } = useTranslation('security')
  return (

    <Container>
      <InnerContainer>
        <Content>
          <H1 id={getSlug(props.audit.title)}>
            <Subheader>{`${props.audit.startDate} - ${props.audit.endDate}`}</Subheader>
            <HeaderTitle>{t(`${props.audit.title}`)}</HeaderTitle>
          </H1>
          <HeaderContent>
            {props.audit.intro}
          </HeaderContent>
        </Content>
        <ImageContainer>
          <img alt={props.audit.partner.logo.alt} src={`${props.audit.partner.logo.image}`} width='282' height='282' />
        </ImageContainer>
      </InnerContainer>
      <BreadcrumbsContainer>
        <Breadcrumbs className='bread' crumbs={[...props.crumbs, { name: props.audit.title }]} />
      </BreadcrumbsContainer>
    </Container>
  )
}

const Container = styled.div`
  background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['25'] : colors.gray['900']};
`
const BreadcrumbsContainer = styled.div`
  ${utils.fullWidthContainer};
  
  @media screen and (max-width: 768px) {
    white-space: nowrap;
    max-width: 100%;
    overflow-x: auto;
    margin-right: 20px;
  }

  .bread {
    margin-bottom: 0;
    padding-bottom: 26px;
  }
`

const InnerContainer = styled.div`
  display: flex;
  ${utils.fullWidthContainer};
  justify-content: space-between;
  padding-top: 96px;
  padding-bottom: 80px;

  @media (max-width: 768px) {
    padding-top: 64px;
    padding-bottom: 64px;
    flex-direction: column;
    align-items: stretch;
  }
`

const Content = styled.div`
  width: 768px;
  margin-right: 96px;

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

const HeaderContent = styled.p`
  color: ${props => props.theme.secondaryColor};
  ${typography.styles.textXl}
  ${typography.weights.regular}
`

const ImageContainer = styled.div`
  text-align: center;
`

const H1 = styled.h1``

export { Hero }
