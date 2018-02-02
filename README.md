<h1 align="center">
  <br>
  <a href="https://github.com/vibedrive/vibedb">
    <div style="display: block" alt="vibd" width="200">
  </a>
  <br>
  vibd
</h1>

<h4 align="center">
  <span> </span>
  <br>
  <br>
</h4>



kind of like [the beets cli](http://beets.readthedocs.io/en/v1.4.6/reference/cli.html) but [distributed](https://github.com/mafintosh/hyperdb) and portable across node.js and [browsers](https://github.com/browserify/browserify).

track progress towards v1 [here](https://github.com/vibedrive/vibd/issues/1)

## table of contents

- [install](#install)
- [usage](#usage)
- [api](#api)
- [prior art](#prior-art)
- [see also](#see-also)

## install 

with [npm](https://www.npmjs.com/)

globally: 
`npm install -g vibd`

as a module: 
`npm install vibd --save`


## usage

*cli not implemented yet

```
Usage: vibd 

commands:

  import
  list
  remove
  modify
  move
  update
  write
  stats
  fields
  config
```

## api

```js
var os = require('os')
var path = require('path')
var Library = require('vibd')
var vibd = Library(path.join(os.homedir(), 'vibd'))
```

### Class: Library
represents a database containing songs, which are Item instances.

#### library.items(query, sort)
get Item objects matching the query.

#### library.get(id)
fetch an Item by its ID. Returns None if no match is found.

#### library.add(item)
add the Item object to the library database. 
returns the object’s new id.


### Class: Model
represents an object in the database. 

#### model.keys()
get a list of available keys for objects of this type.

#### model.get(key)

#### model.items()

#### model.load()

#### model.remove()

#### model.set(key)

#### models.update(values)


### Class: Item
represents songs

#### Item.from(path)
#### Item.from(stream)
#### Item.from(buffer)
returns an item instance.

#### item.read(mediaFile)

#### item.write(mediaFile)


### Class: AudioFile
represents an audio file and provides access to its data.

#### audioFile.relativePath(library)

#### audioFile.absolutePath(storage)
returns the path in the library directory on a given storage designated for the item.


### Class: Storage
represents a storage medium where a MediaFile can be saved. 


## prior art

- [beets](http://beets.readthedocs.io/)
- [hyperamp](https://github.com/hypermodules/hyperamp)


## see also

- [ipfs](https://github.com/ipfs/js-ipfs)
- [omi api spec](https://github.com/omi/api-specs)


## License

[Apache License 2.0](https://github.com/vibedrive/vibd/blob/master/LICENSE)
