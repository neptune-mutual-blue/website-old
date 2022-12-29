import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { getSlug } from '../../../services/helpers/slug'
import { colors } from '../../../styles/colors'
import { typography } from '../../../styles/typography'
import { utils } from '../../../styles/utils'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { Button } from '../../components/Button'
import { HtmlContent } from '../../components/Content'
import { SocialShare } from '../../components/SocialShare'
import { TableOfContents } from '../../components/TableOfContents'

const CareersDetail = (props) => {
  const { t } = useTranslation('careers-detail')

  return (
    <>
      <Header>
        <Title id={getSlug(props.vacancy.title)}>{props.vacancy.title}</Title>
      </Header>

      <MainWrapper>
        <Sidebar>
          <TableOfContents title={props.vacancy.title} headers={props.vacancy.description.toc} />
        </Sidebar>

        <ContentWrapper>
          <Breadcrumbs crumbs={[...props.crumbs, { name: props.vacancy.title }]} />

          <Types>
            <Type>
              <Label>
                {t('Department')}
              </Label>
              <TypeContent>{props.vacancy.department}</TypeContent>
            </Type>
            <Type>
              <Label>
                {t('Job Type')}
              </Label>
              <TypeContent>{props.vacancy.type}</TypeContent>
            </Type>
            <Type>
              <Label>
                {t('Location')}
              </Label>
              <TypeContent>{props.vacancy.location}</TypeContent>
            </Type>
          </Types>

          <AboutThisVacancy>
            <span />
            <div>
              {t('About this Vacancy')}
            </div>
          </AboutThisVacancy>
          <HtmlContent content={props.vacancy.description.html} />
          <SocialShare title={props.vacancy.title} intro={(props.vacancy.text || '').substr(0, 100)} />

          <ButtonContainer>
            <Button hierarchy='primary' as='a' target='_blank' href={props.vacancy.form} rel='noreferrer' size='lg' iconTrailing iconVariant='arrow-square-up-right'>
              {t('Submit My Job Application')}
            </Button>
          </ButtonContainer>

        </ContentWrapper>

      </MainWrapper>
    </>
  )
}

const MainWrapper = styled.div`
  ${utils.fullWidthContainer};
  padding-left: 86px;
  padding-right: 86px;
  word-break: break-word;

  padding-top: 60px;
  padding-bottom: 96px;


  display: grid;
  gap: 64px;
  grid-template-columns: 4fr 9fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding-top: 28px;
    padding-bottom: 56px;
    
    ${utils.fullWidthContainer};
  }
`

const Sidebar = styled.div`
  border-right: 1px solid ${props => props.theme.isLightMode ? colors.gray[200] : colors.gray[700]};
  @media (max-width: 768px) {
    display: none;
  }
`

const ContentWrapper = styled.div`
`
const AboutThisVacancy = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;

  div {
    position: relative;
    background-color: ${props => props.theme.isLightMode ? colors.white : colors.gray[800]};;
    padding: 0 24px;
    ${typography.weights.semibold}
    ${typography.styles.textXl}
  }

  span {
    border-top: 1px solid ${props => props.theme.isLightMode ? colors.gray[200] : colors.gray[700]};
    display: block;
    width: 100%;
    position: absolute;
    top: 50%;
  }
`

const Types = styled.div`
  display: flex;
  margin-bottom: 56px;
  gap: 32px;

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }
`

const Type = styled.div`
  display: flex;
  flex-direction: column;
  

  &:nth-of-type(1){
    margin-left: 0;
  }
  &:nth-last-of-type(1){
    margin-right: 0;
  }

  @media (max-width: 768px) {
    margin: 0;
  }
`
const Label = styled.span`
  color: ${props => props.theme.isLightMode ? colors.gray[600] : colors.gray[300]};
  ${typography.styles.textSm}
  ${typography.weights.regular}
  @media (max-width: 768px) {
    display: block;
    margin-bottom: 4px;
  }
`

const TypeContent = styled.span`
  color: ${props => props.theme.isLightMode ? colors.gray[900] : colors.gray[25]};
  ${typography.styles.textLg}
  ${typography.weights.medium}
`

const Header = styled.div`
  text-align: center;
  background-color: ${props => props.theme.isLightMode ? colors.indigo[25] : colors.gray[900]};
  padding: 96px 0;

  @media (max-width: 768px) {
    text-align: left;
    padding-left: 16px;
  }
`
const Title = styled.h1`
  ${typography.styles.displayLg}
  ${typography.weights.semibold}
`

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 56px;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: start;
  }
`

export { CareersDetail }
