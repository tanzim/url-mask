# url-mask
Utility for masking url userinfo

## Getting Started
```
$ npm install url-mask
```

## Usage
```
assert = require('assert');
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
  
