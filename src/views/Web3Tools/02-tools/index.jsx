// import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { colors } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'
import { utils } from '../../../../styles/utils'
import { Icon } from '../../../components/Icon'

const tools = [
  {
    slug: 'string-to-bytes32-converter',
    title: 'Online String to Solidity Bytes32 Converter',
    intro: 'Convert Solidity bytes32 to utf8 string and vice versa.',
    category: 'Solidity',
    icon: 'code-square-one',
    badges: [{
      color: 'success',
      icon: 'stars-01',
      text: 'Popular'
    }]
  },
  {
    slug: 'abi-encoder',
    title: 'Online Solidity ABI Encoder',
    intro: 'Enter your Solidity smart contract or interface ABI code and access them easily.',
    category: 'Solidity',
    icon: 'code-square-one',
    badges: []
  }
]
export const Tools = () => {
  // const { t } = useTranslation('grants')

  return (
    <Container>
      <ToolsContainer>
        {
          tools.map((tool, i) => {
            const badge = tool.badges[0]

            return (
              <Tool key={i} href={`/web3-tools/${tool.slug}`}>
                <TitleAndBadgeContainer>
                  <ToolTitle>{tool.title}</ToolTitle>
                  {
                    badge && (
                      <BadgeContainer color={badge.color}>
                        {badge.icon && <Icon variant={badge.icon.toLowerCase()} size={16} />}
                        <span>{badge.text}</span>
                      </BadgeContainer>
                    )
                  }
                </TitleAndBadgeContainer>

                <ToolIntro>{tool.intro}</ToolIntro>

                <BottomContainer>
                  <CategoryContainer>
                    {tool.icon && <Icon variant={tool.icon} size={20} />}
                    <ToolCategory>{tool.category}</ToolCategory>
                  </CategoryContainer>

                  <ArrowButton>
                    <span>Click arrow button</span>
                    <Icon variant='arrow-right' size={20} />
                  </ArrowButton>

                </BottomContainer>
              </Tool>
            )
          }
          )
        }
      </ToolsContainer>
    </Container>
  )
}

const Container = styled.div`
  padding-top: 56px;
  ${utils.fullWidthContainer}
  
  @media screen and (max-width: 768px) {
    padding-top: 24px;
  }
`

const ToolsContainer = styled.div`
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-direction: column;
  gap: 32px;

  @media screen and (max-width: 768px) {
    max-width: auto;
  }
`

const Tool = styled.a`
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
    justify-content: space-between;
    align-items: flex-start;
  }
`

const CategoryContainer = styled(FlexContainer)`
  svg {
    color: ${props => props.theme.isLightMode ? colors.gray[400] : colors.gray[300]};
  }
`

const ToolTitle = styled.div`
  ${typography.styles.textLg}
  ${typography.weights.medium}

  color: ${props => props.theme.isLightMode ? colors.gray[900] : colors.white};
`

const ToolIntro = styled.div`
  ${typography.styles.textMd}
  ${typography.weights.regular}
  
  margin-top: 8px;
  color: ${props => props.theme.isLightMode ? colors.gray[600] : colors.gray[25]};
  
  @media screen and (max-width: 768px) {
    margin-top: 16px;
  }
`

const ToolCategory = styled.div`
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
  background-color: ${props => props.theme.isLightMode ? colors[props.color][50] : colors.gray[600]};

  & svg {
    color: ${props => colors[props.color][500]};
  }
  
  & span {
    color: ${props => props.theme.isLightMode ? colors[props.color][700] : colors[props.color][50]};
  }
`

const BottomContainer = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ArrowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  span {
    ${utils.srOnly};
  }
`
