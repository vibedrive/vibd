var assert = require('assert')
var EventEmitter = require('events')
var Item = require('./Item')
var hyperdb = require('hyperdb')
var pump = require('pump')
var through = require('through2')
var concat = require('concat-stream')

module.exports = Library

function Library (storage) {
  if (!(this instanceof Library)) return new Library(storage)

  this.db = hyperdb(storage, { valueEncoding: 'utf-8' })
  this.db.on('ready', () => {
    this.emit('ready')
  })

  EventEmitter.call(this)
}

Library.prototype = Object.create(EventEmitter.prototype)

Library.prototype.constructor = Library

Library.prototype.add = function (item, cb) {
  assert.equal(item instanceof Item, true, `library#add: 'item' should of type 'Item'`)

  this.db.put(item.id, JSON.stringify(item), function (err) {
    cb(err, item.id)
  })
}

Library.prototype.get = function (id, cb) {
  assert.equal(typeof id, 'string', `library#get: 'id' should of type 'string'`)

  this.db.get(id, function (err, nodes) {
    var result = JSON.parse(nodes[0].value)
    var item = Item.from(result)
    cb(err, item)
  })
}

Library.prototype.items = function (query, sort, cb) {
  if (typeof cb === 'undefined') cb = sort
  assert.equal(typeof query, 'string', `library#items: 'query' should be of type 'string'`)

  var stream = this.db.createHistoryStream()
  var transform = through.obj(function (node, enc, callback) {
    var item = JSON.parse(node.value)

    if (item.id.indexOf(query) !== -1) {
      this.push(Item.from(item))
    }

    callback()
  })

  pump(stream, transform, concat(function (items) {
    cb(null, items)
  }))
}
