# readable-stream-node-to-web [![Build Status](https://travis-ci.org/xuset/readable-stream-node-to-web.svg?branch=master)](https://travis-ci.org/xuset/readable-stream-node-to-web) [![npm](https://img.shields.io/npm/v/readable-stream-node-to-web.svg)](https://npmjs.org/package/readable-stream-node-to-web)

#### Convert a nodejs Readable stream to a web ReadableStream

[![Sauce Test Status](https://saucelabs.com/browser-matrix/xuset-readable-stream-node-to-web.svg)](https://saucelabs.com/u/xuset-readable-stream-node-to-web)


```js
var nodeToWebStream = require('readable-stream-node-to-web');

var nodeStream = // Obtain a nodejs Readable stream
var webStream = nodeToWebStream(nodeStream);
```

`nodeStream` is a [NodeJS Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams)

`webStream` is a [WhatWG web ReadableStream](https://streams.spec.whatwg.org/#rs-class)

This method takes a readable node stream and returns a web stream to reads from given the node stream. This allows the plethora of nodejs modules involving Readable streams to be used in a web context like using a node stream with [FetchEvent.respondWith()](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith)

This module can be used with bundlers like browserify or webpack. This module is also written in es5 so there is no need for transpilation.

## License

MIT. Copyright (c) Austin Middleton.
