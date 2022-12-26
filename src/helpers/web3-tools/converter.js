import BigNumber from 'bignumber.js'

BigNumber.config({ EXPONENTIAL_AT: 99, DECIMAL_PLACES: 50 })

const getPowerValue = unit => {
  let _power
  switch (unit) {
    case 'kWei':
      _power = 3
      break

    case 'mWei':
      _power = 6
      break

    case 'gWei':
      _power = 9
      break

    case 'szabo':
      _power = 12
      break

    case 'finney':
      _power = 15
      break

    case 'ether':
      _power = 18
      break

    case 'kEther':
      _power = 21
      break

    case 'mEther':
      _power = 24
      break

    case 'gEther':
      _power = 27
      break

    case 'tEther':
      _power = 30
      break

    default:
      _power = 0
      break
  }

  return _power
}

/**
 *
 * @param { 'kWei' | 'mWei' | 'gWei' | 'szabo' | 'finney' | 'ether' | 'kEther' | 'mEther' |  'gEther' | 'tEther' } to - unit to convert to
 * @param { string | number } x - value to convert
 * @returns { string } converted string from wei unit
 */
const convertFromWei = (to, x) => {
  const _pow = getPowerValue(to)
  const value = new BigNumber(x.toString()).dividedBy(new BigNumber(10).pow(_pow)).toString()
  return value
}

/**
 *
 * @param { 'kWei' | 'mWei' | 'gWei' | 'szabo' | 'finney' | 'ether' | 'kEther' | 'mEther' |  'gEther' | 'tEther' } from - unit to convert from
 * @param { string | number } x - value to convert
 * @returns { string } converted string to wei unit
 */
const convertToWei = (from, x) => {
  const _pow = getPowerValue(from)
  const value = new BigNumber(x.toString()).multipliedBy(new BigNumber(10).pow(_pow)).toString()
  return value
}

export {
  convertToWei,
  convertFromWei
}
