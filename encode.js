'use strict'

const {isValidHex} = require('./validate')

const primitive = (val) => val

// const stringToHex = (str) => {
//   if (isValidHex(str)) return str

//   return '0x' +
//     str.split('')
//     .map((char) => char.charCodeAt(0).toString(16))
//     .join('')
// }

const bufferToHex = (val) => '0x' + val.toString('hex')

const numberToHex = (val) => '0x' + val.toString(16)

const encodeData = (val) => {
  if (!Buffer.isBuffer(val)) {
    throw new Error('data must be a Buffer')
  }
  return bufferToHex('hex')
}

const encodeAddress = (val) => {
  if (!isValidHex(val)) {
    throw new Error('address must be a hex string')
  }
  if (val.length !== 42) { // '0x' + 40 * 2
    throw new Error('address must be 20 bytes long')
  }
  return val
}

const encodeHash = (val) => {
  if (!isValidHex(val)) {
    throw new Error('hash must be a hex string')
  }
  if (val.length !== 66) { // '0x' + 32 * 2
    throw new Error('hash must be 20 bytes long')
  }
  return val
}

const encodeBlockNr = (val) => {
  if (val === 'latest' || val === 'earliest' || val === 'pending') return val
  if (typeof val !== 'number') {
    throw new Error('blockNr must be a number or latest/earliest/pending')
  }
  return numberToHex(val)
}

module.exports = {
  boolean: primitive,
  number: numberToHex,
  string: primitive,
  data: encodeData,
  address: encodeAddress,
  hash: encodeHash,
  blockNr: encodeBlockNr
  // todo: array
  // todo: object
  // todo: call
  // todo: work
}
