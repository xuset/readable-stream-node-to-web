
var test = require('tape')
var PassThrough = require('stream').PassThrough
var ReadableStream = require('stream').Readable
var nodeToWebStream = require('.')

test('sanity check', function (t) {
  var str = 'foobar'
  streamToString(nodeToWebStream(stringToStream(str)))
  .then(output => {
    t.equal(str, output)
    t.end()
  })
  .catch(err => t.end(err))
})

test('cancel() ensures cleanup', function (t) {
  t.timeoutAfter(3000)
  var nodeStream = new ReadableStream()
  nodeStream._destroy = function () {
    t.end()
  }
  var webStream = nodeToWebStream(nodeStream)

  nodeStream.on('end', function () {
  })

  webStream.cancel()
})

test('cancel() ensures _destroy()', function (t) {
  t.timeoutAfter(3000)
  var nodeStream = new ReadableStream()
  var webStream = nodeToWebStream(nodeStream)

  nodeStream._destroy = function () {
    t.end()
  }

  webStream.cancel()
})

test('errored node stream', function (t) {
  t.timeoutAfter(3000)
  var nodeStream = new ReadableStream({ read: function () {} })
  var webStream = nodeToWebStream(nodeStream)

  nodeStream.emit('error', new Error('foobar'))

  webStream.getReader().read().catch(function (err) {
    t.equals(err.message, 'foobar')
    t.end()
  })
})

test('node stream closed early', function (t) {
  t.timeoutAfter(3000)
  var nodeStream = new ReadableStream({ read: function () {} })
  var webStream = nodeToWebStream(nodeStream)

  nodeStream.push(null)

  webStream.getReader().read().then(function (result) {
    t.equals(result.done, true)
    t.end()
  })
})

function stringToStream (str) {
  var s = new PassThrough()
  s.end(Buffer.from(str))
  return s
}

function streamToString (stream) {
  return new Promise(function (resolve, reject) {
    let reader = stream.getReader()
    let buffer = ''
    reader.read().then(onRead)

    function onRead (result) {
      if (result.done) return resolve(buffer)

      buffer += result.value.toString()
      reader.read().then(onRead)
    }
  })
}
