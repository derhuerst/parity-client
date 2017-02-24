'use strict'

const randombytes = require('randombytes')

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

const defaults = {
  timeout: 60 * 1000
}

const call = (client, method, params = [], opt = {}) =>
  new Promise((resolve, reject) => {
    opt = Object.assign({}, defaults, opt)

    const req = encodeCall(method, params)
    const body = JSON.stringify(req)

    const onMessage = (e) => {
      try {
        const res = JSON.parse(e.data)
        if (res.id !== req.id) return
        const data = decode(res.result, method.returns)

        client.removeEventListener('message', onMessage)
        clearTimeout(timeout)

        resolve(data)
      } catch (err) {
        return reject(err)
      }
    }

    client.addEventListener('message', onMessage)
    const timeout = setTimeout(() => {
      reject(new Error(`${method.name} call ${req.id} timed out`))
    }, opt.timeout)

    if (client.readyState === client.OPEN) client.send(body)
    else client.once('open', () => client.send(body))
  })

module.exports = call
