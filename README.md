# eight-track-normalize-multipart [![Build status](https://travis-ci.org/twolfson/eight-track-normalize-multipart.png?branch=master)](https://travis-ci.org/twolfson/eight-track-normalize-multipart)

`multipart/form-data` normalize function for [eight-track][].

[eight-track]: https://github.com/uber/eight-track

This was built to support easier testing against servers that accept `mutlipart/form-data`.

## Getting Started
Install the module with: `npm install eight-track-normalize-multipart`

```javascript
// Load in dependencies
var normalizeMultipart = require('eight-track-normalize-multipart');
var express = require('express');
var eightTrack = require('eight-track');

// Create eight-track server that is normalizes multipart/form-data boundaries
express().use(eightTrack({
  url: 'http://localhost:1337',
  fixtureDir: 'directory/to/save/responses',
  normalizeFn: normalizeMultipart
})).listen(1338);
```

## Documentation
`eight-track-normalize-multipart` exports `normalizeMultipart` as its `module.exports`.

### `normalizeMultipart`
Function that has the signature as expected by [eight-track's `normalizeFn` parameter][eight-track-options]. It is designed to mutate `info` but will not corrupt original `request` data.

https://github.com/uber/eight-track/tree/1.3.0#eighttrackoptions

[eight-track-options]: https://github.com/uber/eight-track/tree/1.3.0#eighttrackoptions

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## Donating
Support this project and [others by twolfson][gittip] via [gittip][].

[![Support via Gittip][gittip-badge]][gittip]

[gittip-badge]: https://rawgithub.com/twolfson/gittip-badge/master/dist/gittip.png
[gittip]: https://www.gittip.com/twolfson/

## Unlicense
As of Jan 27 2014, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
