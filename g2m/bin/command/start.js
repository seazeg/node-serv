'use strict';
const fs = require('fs')
const path = require('path')
const { g2m } = require('../../lib/server')

module.exports = (program) => {
  let config = JSON.parse(fs.readFileSync(path.resolve(program.config)), 'utf-8') || {}
  g2m.run(config)
}