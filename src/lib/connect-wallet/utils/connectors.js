import { ConnectorNames } from '../config/connectors'

export const getInjectedConnector = async () => {
  const { InjectedConnector } = await import('@web3-react/injected-connector')
  return new InjectedConnector()
}

/**
 * Asynchronously load the selected connector only
 *
 * @param {string} name
 */
export const getConnectorByName = async (name) => {
  switch (name) {
    case ConnectorNames.Injected: {
      const c = await getInjectedConnector()
      return c
    }

    default:
      return null
  }
}
