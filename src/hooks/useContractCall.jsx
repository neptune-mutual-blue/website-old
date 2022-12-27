import { useEffect, useState } from 'react'
import { useWallet } from '../context/WalletContext'
import { getContract } from '../helpers/solidity/contract'

export const useContractCall = ({ abi, address }) => {
  const { provider } = useWallet()
  const [contract, setContract] = useState(null)

  useEffect(() => {
    if (!abi || !address || !provider?.getSigner) return

    try {
      const _c = getContract(address, abi, provider.getSigner())
      setContract(_c)
    } catch (err) {
      console.log('Error in creating contract: ', err)
    }
  }, [abi, address, provider])

  async function callMethod (methodName, args = []) {
    if (!contract || !methodName) return

    try {
      const res = await contract[methodName](...args)
      console.log({ res })
    } catch (err) {
      console.log(`Error in calling ${methodName} function: ${err}`)
    }
  }

  return { callMethod }
}
