'use strict'

const randombytes = require('randombytes')
const Promise = require('pinkie-promise')
const {fetch} = require('fetch-ponyfill')({Promise})

const encode = require('./encode')
const decode = require('./decode')

const encodeCall = (method, params) => {
  const required = method.params.filter((p) => !p.optional).length
  const l = params.length
  if (l < required) {
    throw new Error(`${l} parameters passed, ${required} required`)
  }

  const req = {
    jsonrpc: '2.0',
    id: randombytes(8).toString('hex'),
    method: method.name,
    params: []
  }

  for (let i = 0; i < l; i++) {
    const {format} = method.params[i]
    const value = params[i]

    req.params.push(encode(value, format))
  }

  return req
}

const client = (host) => {
  const url = `http://${host}/` // todo: more robust parsing

  const call = (method, ...params) => {
    const req = encodeCall(method, params)
    const body = JSON.stringify(req)

    return fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body,
      cache: 'no-store'
    })
    .then((res) => {
      if (!res.ok) throw new Error('response not ok')
      return res.json()
    })
    .then((res) => {
      if (res.id !== req.id) throw new Error('response id does not match request id')
      return decode(res.result, method.returns)
    })
  }

  return call
}

module.exports = client
