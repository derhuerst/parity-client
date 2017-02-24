'use strict'

const hex = /^0x[A-Fa-f0-9]+$/
const isValidHex = (val) => {
  if (typeof val !== 'string') return false
  if (!hex.test(val)) return false
  return true
}

const isValidAddress = (val) => {
  if (!isValidHex(val)) return false
  return val.length === 42 // 2 + 20 * 2
}

const isValidHash = (val) => {
  if (!isValidHex(val)) return false
  return val.length === 66 // 2 + 32 * 2
}

module.exports = {isValidHex, isValidAddress, isValidHash}
