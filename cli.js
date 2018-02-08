#!/usr/bin/env node

var path = require('path')
var os = require('os')
var mkdirp = require('mkdirp')
var minimist = require('minimist')
var Library = require('./lib/Library')

process.title = 'vibd'

const STORAGE = path.join(os.homedir(), 'vibd', 'db')
const USAGE = `
  Usage: vibd <command> [opts]

  Commands:

    add [path]      add a song
    list            list the content of the db 
`

var argv = minimist(process.argv.slice(2), {
  alias: {
    help: 'h',
    version: 'v'
  },
  boolean: [
    'help',
    'version'
  ]
})

main(argv)

function main (argv) {
  var cmd = argv._[0]
  var opts = argv._.slice(1)

  if (!cmd || argv.help) {
    return console.log(USAGE)
  }

  mkdirp(STORAGE)

  switch (cmd) {
    case 'list':
      runList.apply(null, opts)
      break
    default:
      console.log(USAGE)
      break
  }
}

function runList () {
  var vibd = Library(STORAGE)

  vibd.on('ready', () => {
    vibd.items('', function (err, items) {
      if (err) return console.error(err)
      if (!items.length) return console.log('\n  db is empty.\n')
      items.forEach(item => console.log(item))
    })
  })
}
