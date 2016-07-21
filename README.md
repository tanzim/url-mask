# url-mask
Utility for masking url userinfo

[![npm version](https://badge.fury.io/js/url-mask.svg)](https://badge.fury.io/js/url-mask)
[![Dependencies](https://david-dm.org/tanzim/url-mask.svg)](https://github.com/tanzim/url-mask)
[![Build Status](https://travis-ci.org/tanzim/url-mask.svg?branch=master)](https://travis-ci.org/tanzim/url-mask)
[![Coverage Status](https://coveralls.io/repos/github/tanzim/url-mask/badge.svg?branch=master)](https://coveralls.io/github/tanzim/url-mask?branch=master)

## Getting Started
```
$ npm install url-mask
```

## Usage
```javascript
const assert = require('assert');
const urlmask = require('url-mask');
const url = 'http://user:secret@github.com/';

//
// By default both username and password are masked with *
//
let masked = urlmask(url);
assert.equal('http://*****:*****@github.com/', masked);
console.log(`masked url using defaults: ${masked}`);

//
// Additional options can be specified not to mask the username
// or use a different masking character
//
masked = urlmask(url, { maskUsername: false });
assert.equal('http://user:*****@github.com/', masked);
console.log(`masked url overriding maskUsername option: ${masked}`);

masked = urlmask(url, { maskCharacter: '-' });
assert.equal('http://-----:-----@github.com/', masked);
console.log(`masked url overriding maskCharacter option: ${masked}`);
```

## Notes
The mask is always 5 characters long, irrespective of the length of the userinfo (username/password) fields
  
