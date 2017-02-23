'use strict'
Buffer.from([]) // todo: https://github.com/substack/node-browserify/issues/1531

const {isValidHex} = require('./validate')

const atomic = (val) => val

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

const encodeArray = (arr, format) => {
  if (!encoders[format]) throw new Error('no encoder for atomic format ' + format)
  return arr.map(encoders[format])
}

const encodeObject = (obj, formats) => {
  const res = {}

  for (let key in obj) {
    const format = formats[key]
    // if (!format) throw new Error('no encoder for object key ' + key)
    if (!format) continue // todo
    res[key] = encode(obj[key], format)
  }

  return res
}

const encoders = {
  boolean: atomic,
  number: numberToHex,
  string: atomic,
  data: encodeData,
  address: encodeAddress,
  hash: encodeHash,
  blockNr: encodeBlockNr,
  array: encodeArray,
  object: encodeObject
  // todo: call
  // todo: work
}

const encode = (val, format) => {
  if (Array.isArray(format)) {
    const encoder = encoders[format[0]]
    if (!encoder) throw new Error('no encoder for complex format ' + format[0])
    return encoder(val, ...format.slice(1))
  }

  const encoder = encoders[format]
  if (!encoder) throw new Error('no encoder for atomic format ' + format)
  return encoder(val)
}

module.exports = encode
