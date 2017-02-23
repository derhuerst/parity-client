'use strict'

const {isValidHex} = require('./validate')

const atomic = (val) => val

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

const decodeArray = (arr, format) => {
  if (!decoders[format]) throw new Error('no decoder for atomic format ' + format)
  return arr.map(decoders[format])
}

const decodeObject = (obj, formats) => {
  const res = {}

  for (let key in obj) {
    const format = formats[key]
    // if (!format) throw new Error('no decoder for object key ' + key)
    if (!format) continue // todo
    res[key] = decode(obj[key], format)
  }

  return res
}

const decoders = {
  boolean: atomic,
  number: hexToNumber,
  string: atomic,
  data: hexToBuffer,
  address: atomic,
  hash: atomic,
  blockNr: decodeBlockNr,
  array: decodeArray,
  object: decodeObject
}

const decode = (val, format) => {
  if (Array.isArray(format)) {
    const decoder = decoders[format[0]]
    if (!decoder) throw new Error('no decoder for complex format ' + format[0])
    return decoder(val, ...format.slice(1))
  }

  const decoder = decoders[format]
  if (!decoder) throw new Error('no decoder for atomic format ' + format)
  return decoder(val)
}

module.exports = decode
