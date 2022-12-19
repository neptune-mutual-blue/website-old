import { useTranslation } from 'react-i18next'
import styled, { useTheme } from 'styled-components'

import { colors } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { Icon } from '../../../components/Icon'

export const ActiveCampaigns = ({ programs }) => {
  const { t } = useTranslation('grants')

  const { isLightMode } = useTheme()

  if (!programs?.length) return null

  return (
    <Container>
      <HeaderContainer>
        <Heading>{t('Active Campaigns and Promotions')}</Heading>
        <SubHeading>
          {t('Partners that provide value and increase adoption and usage of Neptune Mutual will be handsomely compensated for their efforts.')}
        </SubHeading>
      </HeaderContainer>

      <ProgramContainer>
        {
          programs.map((program, i) => {
            const badge = program.badges[0]

            return (
              <Program key={i} href={`/grants-and-bounties/${program.slug}`}>
                <TitleAndBadgeContainer>
                  <ProgramTitle>{program.title}</ProgramTitle>
                  <BadgeContainer data-color={badge.color} data-is-lightmode={isLightMode}>
                    {badge.icon && <Icon variant={badge.icon.toLowerCase()} size={8} />}
                    <span>{badge.text}</span>
                  </BadgeContainer>
                </TitleAndBadgeContainer>

                <ProgramIntro>{program.intro}</ProgramIntro>

                <CategoryContainer>
                  {program.icon && <Icon variant={program.icon} size={20} />}
                  <ProgramCategory>{program.category}</ProgramCategory>
                </CategoryContainer>
              </Program>
            )
          }
          )
        }
      </ProgramContainer>
    </Container>
  )
}

const Container = styled.div`
  padding-top: 96px;
  padding-bottom: 96px;
  ${utils.fullWidthContainer}

  @media screen and (max-width: 768px) {
    padding-top: 64px;;
    padding-bottom: 48px;
  }
`

const HeaderContainer = styled.div`
  max-width: 768px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  
  @media screen and (max-width: 768px) {
    text-align: left;
  }
`

const Heading = styled.h2`
  ${typography.styles.displayMd}
  ${typography.weights.semibold}
`

const SubHeading = styled.p`
  margin-top: 20px;

  ${typography.styles.textXl}
  ${typography.weights.regular}

  color: ${props => props.theme.isLightMode ? colors.gray[600] : colors.gray[25]};
`

const ProgramContainer = styled.div`
  margin-top: 64px;
  width: 768px;
  margin-left: auto;
  margin-right: auto;
  
  & > *:not(:first-child) {
    margin-top: 32px;
  }
  
  @media screen and (max-width: 1023px) {
    width: auto;
    margin-top: 48px;

    & > *:not(:first-child) {
      margin-top: 24px;
    }
  }
`

const Program = styled.a`
  display: block;
  padding-top: 24px;
  
  &:not(:first-of-type) {
    border-top: 1px solid ${props => props.theme.isLightMode ? colors.gray[200] : colors.gray[700]};
  }
`

const FlexContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  & svg {
    color: ${props => props.theme.isLightMode ? colors.gray[400] : colors.gray[500]}
  }

`

const TitleAndBadgeContainer = styled(FlexContainer)`
  @media screen and (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
  }
`

const CategoryContainer = styled(FlexContainer)`
  margin-top: 24px;
`

const ProgramTitle = styled.div`
  ${typography.styles.textLg}
  ${typography.weights.medium}

  color: ${props => props.theme.isLightMode ? colors.gray[900] : colors.white};
`

const ProgramIntro = styled.div`
  ${typography.styles.textMd}
  ${typography.weights.regular}
  
  margin-top: 8px;
  color: ${props => props.theme.isLightMode ? colors.gray[600] : colors.gray[25]};
  
  @media screen and (max-width: 768px) {
    margin-top: 16px;
  }
`

const ProgramCategory = styled.div`
  ${typography.styles.textMd}
  ${typography.weights.medium}
  
  color: ${props => props.theme.isLightMode ? colors.gray[600] : colors.gray[25]};
`

const BadgeContainer = styled.div`
  display: flex;
  ${typography.styles.textSm}
  ${typography.weights.medium}
  
  gap: 6px;
  align-items: center;
  padding: 2px 10px 2px 8px;
  border-radius: 16px;
  background-color: ${props => props.theme.isLightMode ? colors[props['data-color']][50] : colors.gray[600]};

  & svg {
    color: ${props => colors[props['data-color']][500]};
  }
  
  & span {
    color: ${props => props.theme.isLightMode ? colors[props['data-color']][700] : colors[props['data-color']][50]};
  }
`
