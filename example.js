'use strict'

const {eth} = require('parity-rpcs')

const client = require('./lib')('localhost:8180', '2M28-4gXT-X2qW-bAaS')
const call = require('./lib/call')
const createFilter = require('./lib/create-filter')

call(client, eth.getBlockByNumber, [436, false])
.then((block) => {
  console.log(block)
})
.catch(console.error)

const myFilter = createFilter(client, {
	address: '0xb45d4deb4c0e28bec01060a10cd6746ff14d9dd4'
})
myFilter.all()
.then((logs) => {
	console.log(logs)
	return myFilter.stop()
})
.catch(console.error)
