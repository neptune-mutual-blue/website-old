export const getPlaceholder = type => {
  const _getPlaceholder = (_type) => {
    let _val = ''
    switch (_type) {
      case 'uint':
      case 'uint256':
        _val = 111222333
        break

      case 'bytes':
      case 'bytes32':
        _val = '0x112233...'
        break

      case 'address':
        _val = '0x11...22'
        break

      case 'bool':
        _val = 'true'
        break

      default:
        _val = 'hello'
    }

    return _val
  }

  if (type.endsWith('[]')) return `["${_getPlaceholder(type.split('[]')[0])}"]`

  return _getPlaceholder(type)
}
