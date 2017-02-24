# lightweight [Parity](https://ethcore.io/parity.html) client

**A lightweight client to the [Parity](https://ethcore.io) [JSON RPCs](https://github.com/ethcore/parity/wiki/JSONRPC).**

[![npm version](https://img.shields.io/npm/v/parity-client.svg)](https://www.npmjs.com/package/parity-client)
[![build status](https://img.shields.io/travis/derhuerst/parity-client.svg)](https://travis-ci.org/derhuerst/parity-client)
![GPL-licensed](https://img.shields.io/github/license/derhuerst/parity-client.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)

This module contains the logic to encode and decode calls to Parity. It also provides you with abstractions to create [filters](https://github.com/ethcore/parity/wiki/JSONRPC-eth-module#eth_newfilter).

## Installation

This assumes you use [npm](https://www.npmjs.com) to install dependencies and a bundler like [Browserify](http://browserify.org) or [Webpack](https://webpack.js.org) to process your code.

```shell
npm install --save parity-client@derhuerst/parity-client
```

## Usage

### first steps

This assumes you have Parity running at `localhost` with `--jsonrpc-apis net,eth,personal,parity`. Obtain a token by running `parity signer new-token`.

```js
const {eth} = require('parity-rpcs')
const client = require('parity-client')
const call = require('parity-client/lib/call')

const token = '2M28-4gXT-X2qW-bAaS'
const connection = client('localhost:8180', token)

call(connection, eth.call, [
	{
		from: '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
		to: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
		value: 100000
	}
])
.then(console.log, console.error)
```

[`parity-rpcs`](https://github.com/derhuerst/parity-rpcs) contains definitions for most of [the JSON RPCs that Parity supports](https://github.com/ethcore/parity/wiki/JSONRPC). `call` has a signature of `call(connection, rpc, parameters, [options])`.

### using filters

```js
const createFilter = require('parity-client/lib/create-filter')

const filter = createFilter(connection, {
	address: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
	topics: […]
})

filter.all().then(console.log, console.error) // fetch all logs
filter.changes().then(console.log, console.error) // fetch a new logs
filter.stop().then(console.log, console.error) // remove filter
```

See the RPC docs for [`newFilter`](https://github.com/ethcore/parity/wiki/JSONRPC-eth-module#eth_newfilter), [`getFilterChanges`](https://github.com/ethcore/parity/wiki/JSONRPC-eth-module#eth_getfilterchanges), [`getFilterLogs`](https://github.com/ethcore/parity/wiki/JSONRPC-eth-module#eth_getfilterlogs) and [`uninstallFilter`](https://github.com/ethcore/parity/wiki/JSONRPC-eth-module#eth_uninstallfilter) for more details.


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, go to [the issues page](https://github.com/derhuerst/parity-client/issues).
