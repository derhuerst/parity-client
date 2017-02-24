'use strict'

const {newFilter, getFilterLogs, getFilterChanges, uninstallFilter} = require('parity-rpcs/eth')
const call = require('./call')

const defaults = {
  from: 0,
  to: 'latest'
}

const createFilter = (client, data = {}) => {
  data = Object.assign({}, defaults, data)

  const setup = call(client, newFilter, [data])
  let teardown

  const all = () => setup.then((id) => {
    if (teardown) throw new Error('filter has been uninstalled')
    return call(client, getFilterLogs, [id])
  })

  const changes = () => setup.then((id) => {
    if (teardown) throw new Error('filter has been uninstalled')
    return call(client, getFilterChanges, [id])
  })

  const stop = () => setup.then((id) => {
    if (!teardown) teardown = call(client, uninstallFilter, [id])
    return teardown
  })

  return {all, changes, stop}
}

module.exports = createFilter
