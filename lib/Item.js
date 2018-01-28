var assert = require('assert')
var Model = require('./Model')

module.exports = Item

function Item () {
  if (!(this instanceof Item)) return new Item()
  Model.call(this)
}

Item.prototype = Object.create(Model.prototype)

Item.prototype.constructor = Item

Item.from = function (obj) {
  assert.equal(typeof obj, 'object', `Item#from: obj should be type 'object'`)
  return Item()
}
