'use strict'

const {isValidHex} = require('./validate')

const primitive = (val) => val

const hexToNumber = (hex) => {
  if (isValidHex(hex)) return hex

  return parseInt(hex.slice(2), 16)
}

// const hexToString = (hex) => {
//   if (isValidHex(hex)) return hex
//   hex = hex.slice(2)

//   let res = ''
//   for (let i = 0; i < hex.length; i += 2) {
//     res += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
//   }
//   return res
// }

const hexToBuffer = (hex) => {
  if (isValidHex(hex)) return hex

  return Buffer.from(hex.slice(2), 'hex')
}

const decodeBlockNr = (val) => {
  if (val === 'latest' || val === 'earliest' || val === 'pending') return val
  return hexToNumber(val)
}

module.exports = {
  boolean: primitive,
  number: hexToNumber,
  string: primitive,
  data: hexToBuffer,
  address: primitive,
  hash: primitive,
  blockNr: decodeBlockNr
  // todo: array
  // todo: object
}
