'use strict'

const hex = /^0x[A-Fa-f0-9]+$/
const isValidHex = (val) => {
  if (typeof val !== 'string') return false
  if (!hex.test(val)) return false
  return true
}

module.exports = {isValidHex}
