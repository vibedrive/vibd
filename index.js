#!/usr/bin/env node

if (require.main === module) {
  require('./cli')
} else {
  module.exports = require('./lib/Library')
}
