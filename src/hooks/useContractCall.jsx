import { useEffect, useState } from 'react'
import { useWallet } from '../context/WalletContext'
import { getContract } from '../helpers/solidity/contract'
import { ethers } from 'ethers'

export const useContractCall = ({ abi, address }) => {
  const { provider, account } = useWallet()
  const [contract, setContract] = useState(null)

  useEffect(() => {
    if (!abi || !address || !provider?.getSigner || !account) {
      setContract(null)
      return
    }

    try {
      const _c = getContract(address, abi, provider.getSigner())
      setContract(_c)
    } catch (err) {
      console.log('Error in creating contract: ', err)
      setContract(null)
    }
  }, [abi, address, provider, account])

  async function callMethod (methodName, args = []) {
    if (!contract || !methodName) return

    let methodArgs = [...args]
    try {
      await contract.estimateGas[methodName](...args)
    } catch (err) {
      const overrides = {
        gasLimit: '100000',
        gasPrice: '25000000000',
        value: ethers.utils.parseEther('0')
      }

      methodArgs = [...args, overrides]
    }

    try {
      const res = await contract[methodName](...methodArgs)
      return Array.isArray(res) ? Array.from(res) : [res]
    } catch (err) {
      console.log(`Error in calling ${methodName} function: ${err}`)
      return { error: err.message }
    }
  }

  return { callMethod, isReady: Boolean(contract) }
}
