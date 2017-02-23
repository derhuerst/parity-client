'use strict'

const {eth} = require('parity-rpcs')

const client = require('.')('localhost:8180', '2M28-4gXT-X2qW-bAaS')
const call = require('./call')

call(client, eth.getBlockByNumber, [436, false])
.then((block) => {
  console.log(block)
  client.close()
})
.catch(console.error)
