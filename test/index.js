var path = require('path')
var test = require('tape')
var rimraf = require('rimraf')
var Item = require('../lib/Item')
var Library = require('../lib/Library')

rimraf.sync(path.join(__dirname, '../vibd.db'))

var vibd = Library()

test('add item & retrieve it', function (t) {
  var item = Item()

  item.id = '1234'

  vibd.add(item, function (err, id) {
    t.equal(err, null, 'library#add: no error')

    vibd.get(id, onGet)
  })

  function onGet (err, item) {
    t.equal(err, null, 'library#get: no error')
    t.equal(item instanceof Item, true, 'returned item is of right type')

    vibd.items('query', 'sort', onItems)
  }

  function onItems (err, items) {
    t.equal(err, null, 'library#items: no error')
    t.ok(Array.isArray(items), 'library#items: result is an array')
    t.ok(items.every(item => item instanceof Item), 'library#items: returns array of Items')

    t.end()
  }
})
