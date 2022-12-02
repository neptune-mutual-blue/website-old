import styled from 'styled-components'
import { colors, primaryColorKey } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'

export const TabsContainer = ({ tabs, selectedTab, onTabClick }) => {
  return (
    <TabContainer>
      {tabs.map((tab, index) => (
        <TabItem key={index} className={`${selectedTab === tab && 'active'}`} onClick={() => onTabClick(tab)}>
          {tab}
        </TabItem>

      ))}
    </TabContainer>
  )
}

const TabContainer = styled.div`
    display:flex;
    flex-wrap: wrap;
    gap:8px;
    padding: 36px 0;
`

const TabItem = styled.button`
    ${typography.styles.textSm};
    ${typography.weights.semibold};
    padding: 8px 12px;
    color: ${props => props.theme.isLightMode ? colors.gray[500] : colors.gray[300]};
    cursor: pointer;
    text-transform: capitalize;

    &.active{
        color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['700'] : colors[primaryColorKey]['400']};
        background-color: ${props => props.theme.isLightMode ? colors[primaryColorKey]['50'] : colors.gray['700']};
        border-radius: 6px;
    }
`
