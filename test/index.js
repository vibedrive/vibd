var path = require('path')
var test = require('tape')
var rimraf = require('rimraf')
var series = require('run-series')

var Item = require('../lib/Item')
var Library = require('../lib/Library')

const storage = path.join(__dirname, './vibd.db')

test('add item & retrieve it', function (t) {
  rimraf.sync(storage)

  var vibd = Library(storage)
  var item = Item()

  item.id = '1234'

  series([ add, get ], t.end)

  function add (done) {
    vibd.add(item, function (err, id) {
      t.equal(err, null, 'library#add: no error')

      done()
    })
  }

  function get (done) {
    vibd.get(item.id, function (err, item) {
      t.equal(err, null, 'library#get: no error')
      t.equal(item instanceof Item, true, 'returned item is of right type')

      done()
    })
  }
})

test('add items & retrieve them', function (t) {
  rimraf.sync(storage)

  var vibd = Library(storage)
  var item = Item()

  item.id = '1234'

  series([ add, items ], t.end)

  function add (done) {
    vibd.add(item, function (err, id) {
      t.equal(err, null, 'library#add: no error')

      done()
    })
  }

  function items (done) {
    var query = ''

    vibd.items(query, function items (err, items) {
      t.equal(err, null, 'library#items: no error')
      t.ok(Array.isArray(items), 'library#items: result is an array')
      t.ok(items.every(item => item instanceof Item), 'library#items: returns array of Items')

      done()
    })
  }
})
