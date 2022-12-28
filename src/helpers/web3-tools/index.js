import { parseBytes32String, formatBytes32String, toUtf8Bytes } from '@ethersproject/strings'
import { hexlify } from '@ethersproject/bytes'
import BigNumber from 'bignumber.js'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80
})

// eslint-disable-next-line camelcase
export const bytes32_to_string = (bytes32Str) => {
  return parseBytes32String(bytes32Str)
}

// eslint-disable-next-line camelcase
export const string_to_bytes32 = (str, addPadding) => {
  if (addPadding) {
    return formatBytes32String(str)
  }

  return hexlify(toUtf8Bytes(str))
}

// eslint-disable-next-line camelcase
export const bytes32_to_number = (bytes32Str) => {
  const num = new BigNumber(bytes32Str)
  return num.toNumber()
}

// eslint-disable-next-line camelcase
export const number_to_bytes32 = (numberStr) => {
  const num = new BigNumber(numberStr)
  const _bytes = num.toString(16)
  return _bytes
}

/*
console.log(bytes32_to_number('0x6f6b780000000000000000000000000000000000000000000000000000000000')) // 5.039660703823547e+76
console.log(number_to_bytes32('7302008')) // 0x6f6b780000000000000000000000000000000000000000000000000000000000
console.log(bytes32_to_string('0x6f6b780000000000000000000000000000000000000000000000000000000000')) // okx
console.log(string_to_bytes32('okx', true)) // 0x6f6b780000000000000000000000000000000000000000000000000000000000
console.log(string_to_bytes32('okx', false)) // 0x6f6b78
*/
