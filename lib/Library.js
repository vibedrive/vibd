var assert = require('assert')
var Item = require('./Item')
var hyperdb = require('hyperdb')
var pump = require('pump')
var concat = require('concat-stream')

module.exports = Library

function Library () {
  if (!(this instanceof Library)) return new Library()

  this.db = hyperdb('./vibd.db', { valueEncoding: 'utf-8' })
}

Library.prototype.add = function (item, cb) {
  assert.equal(item instanceof Item, true, `library#add: 'item' should of type 'Item'`)

  this.db.put(item.id, JSON.stringify(item), function (err) {
    cb(err, item.id)
  })
}

Library.prototype.get = function (id, cb) {
  assert.equal(typeof id, 'string', `library#get: 'id' should of type 'string'`)

  this.db.get(id, function (err, results) {
    var result = JSON.parse(results[0].value)
    var item = Item.from(result)
    cb(err, item)
  })
}

Library.prototype.items = function (query, sort, cb) {
  if (typeof sort === 'undefined') sort = cb
  assert.equal(typeof query, 'string', `library#items: 'query' should be of type 'string'`)

  var stream = this.db.createHistoryStream()

  pump(stream, concat(function (results) {
    var items = results
      .map(result => result.value)
      .map(value => Item.from(JSON.parse(value)))

    cb(null, items)
  }))
}
