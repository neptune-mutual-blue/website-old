import { useCallback, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ACTIVE_CONNECTOR_KEY } from '../config/localstorage'
import { getConnectorByName } from '../utils/connectors'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { ConnectorNames } from '../config/connectors'

const handleInjectedError = async (notify, error) => {
  if (error instanceof NoEthereumProviderError) {
    console.log({ NoEthereumProviderError })
  }

  if (error instanceof UserRejectedRequestErrorInjected) {
    console.log({ UserRejectedRequestErrorInjected })
  }
}

const clearConnectionData = () => {
  window.localStorage.removeItem(ACTIVE_CONNECTOR_KEY)
}

const activateConnector = async (
  connectorName,
  activate,
  notify
) => {
  const connector = await getConnectorByName(connectorName)

  if (!connector) {
    console.info('Invalid Connector Name', connectorName)
    return
  }

  window.localStorage.setItem(ACTIVE_CONNECTOR_KEY, connectorName)

  activate(connector, async (error) => {
    clearConnectionData()

    switch (connectorName) {
      case ConnectorNames.Injected:
        return handleInjectedError(notify, error)
    }
  })
}

const useAuth = (notify = console.log) => {
  const { activate, deactivate, connector } = useWeb3React()

  useEffect(() => {
    if (!connector) {
      return
    }

    connector?.addListener('Web3ReactDeactivate', clearConnectionData)
    return () => {
      connector?.removeListener('Web3ReactDeactivate', clearConnectionData)
    }
  }, [connector])

  const login = useCallback(
    (connectorName) =>
      activateConnector(connectorName, activate, notify),
    [activate, notify]
  )

  const logout = useCallback(() => {
    clearConnectionData()

    deactivate()
  }, [deactivate])

  return { logout, login }
}

export default useAuth
