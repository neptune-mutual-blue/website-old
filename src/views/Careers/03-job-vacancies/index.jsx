import { useMemo } from 'react'

import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'

import {
  colors,
  primaryColorKey
} from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { VacanciesList } from './VacanciesList'

export const JobVacancies = ({ vacancies }) => {
  const { t } = useTranslation('careers')

  const departments = useMemo(() => {
    const allDepartments = vacancies.map(v => v.department)
    return ['', ...new Set(allDepartments)]
  }, [vacancies])

  return (
    <Container>
      <InnerContainer>
        <Content>
          <H2>
            <Subheading>
              <Trans t={t}>Careers</Trans>
            </Subheading>
            <Heading>
              <Trans t={t}>Job Vacancies</Trans>
            </Heading>
          </H2>
          <SupportingText>
            <Trans t={t}>
              Our philosophy is simple — hire a team of diverse, passionate people and foster a culture that empowers you to do you best work.
            </Trans>
          </SupportingText>
        </Content>

        <Content>
          <VacanciesList vacancies={vacancies} departments={departments} />
        </Content>

      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  padding-top: 96px;
  padding-bottom: 96px;

  @media (max-width: 768px) {
    padding-top: 64px;
    padding-bottom: 64px;
  }
`

const InnerContainer = styled.div`
  ${utils.fullWidthContainer};

  display: flex;
  gap: 64px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Content = styled.div`
  flex: 1;
`

const Subheading = styled.div`
  color: ${(props) => props.theme.isLightMode ? colors[primaryColorKey]['700'] : colors[primaryColorKey]['300']};

  ${typography.styles.textMd};
  ${typography.weights.semibold};

  @media (max-width: 768px) {
    ${typography.styles.textSm};
  }
`
const H2 = styled.h2``

const Heading = styled.div`
  margin-top: 12px;
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
