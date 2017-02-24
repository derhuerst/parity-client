'use strict'

const keccak256 = require('js-sha3').keccak_256
const WebSocket = global.WebSocket || require('ws')

const client = (host, secret) => {
  const url = `ws://${host}/` // todo: more robust parsing

  secret = secret.replace(/[^A-Za-z0-9]/g, '')
  const time = Math.floor(Date.now() / 1000)
  const token = keccak256(secret + ':' + time) + '_' + time

  return new WebSocket(url, token, {origin: 'http://localhost:8180'})
}

module.exports = client
