import styled from 'styled-components'
import { Button } from '../../../components/Button'
import { colors, primaryColorKey } from '../../../../styles/colors'
import { typography } from '../../../../styles/typography'

const History = ({ contracts, download, restore, restorationFailed, restoreSpecificCallback }) => {
  const restoreSpecificContract = (key) => {
    const { abi, contract_name: contractName, address } = contracts[key]
    restoreSpecificCallback({ abi, contractName, address })
  }

  return (
    <Container>
      <HistoryTitle>Previous Contracts</HistoryTitle>
      <HistoryCTA>
        <Button hierarchy='secondary' disabled={contracts.length === 0} size='sm' iconLeading iconVariant='align-bottom-01' onClick={download}>Download Backup</Button>
        <Button hierarchy='secondary' size='sm' iconLeading iconVariant='refresh-ccw-02' onClick={restore}>Restore</Button>
      </HistoryCTA>
      <HistoryList>
        {contracts.length > 0 && contracts.map((contract, i) => {
          return (
            <HistoryListItem key={`contract-${i}`} onClick={() => { return restoreSpecificContract(i) }}>
              {contract.contract_name || 'Untitled'}
            </HistoryListItem>
          )
        })}
      </HistoryList>
      {restorationFailed && <Error>Restoration failed invalid format.</Error>}
    </Container>
  )
}

const Container = styled.div`
  padding: 24px 0px 24px 24px;
  border: 1px solid ${colors.gray[300]};
  border-radius: 8px;
  height: 516px;
  overflow-y: scroll;
  overflow-x: hidden;
`

const HistoryTitle = styled.h2`
  color: ${props => props.theme.isLightMode ? colors.gray[900] : colors.white};
  ${typography.styles.textLg}
  ${typography.weights.bold}
`

const HistoryList = styled.ul`
  width: 342px;
  
`
const HistoryListItem = styled.li`
  word-wrap: break-word;
  ${typography.weights.medium}
  ${typography.styles.textSm}
  color: ${props => props.theme.isLightMode ? colors.gray[900] : colors.white};
  cursor: pointer;
`

const HistoryCTA = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  gap: 8px;

  button {
    color: ${props => props.theme.isLightMode ? colors[primaryColorKey][600] : colors.gray[700]};
    ${typography.styles.textSm}
    background-color: ${colors.white};
  }
`

const Error = styled.p`
  color: ${props => props.theme.isLightMode ? colors.error[800] : colors.error[600]};\
  margin-top:6px;
  ${typography.styles.textSm}
  ${typography.weights.regular}
`

export { History }
