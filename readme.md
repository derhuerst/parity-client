# lightweight [Parity](https://ethcore.io/parity.html) client

**A lightweight client to the [Parity](https://ethcore.io) [JSON RPCs](https://github.com/ethcore/parity/wiki/JSONRPC).**

![GPL-licensed](https://img.shields.io/github/license/derhuerst/parity-client.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)

This module contains the logic to encode and decode calls to Parity.

## Installation

This assumes you use [npm](https://www.npmjs.com) to install dependencies and a bundler like [Browserify](http://browserify.org) or [Webpack](https://webpack.js.org) to process your code.

```shell
npm install --save parity-client@derhuerst/parity-client
```

## Usage

This assumes you have Parity running at `localhost` with `--jsonrpc-apis net,eth,personal,parity`. Obtain a token by running `parity signer new-token`.

```js
const {eth} = require('parity-rpcs')
const client = require('parity-client')
const call = require('parity-client/call')

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


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, go to [the issues page](https://github.com/derhuerst/parity-client/issues).
