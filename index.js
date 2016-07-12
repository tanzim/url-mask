'use strict';

const debug = require('debug')('url-mask');
const assert = require('assert');
const merge = require('lodash.merge');
const parser = require('url');

const defaultOpts = {
  maskUsername: true,
  maskCharacter: '*',
  maskLength: 5
};

function mask(url, opts) {
  assert(typeof url === 'string', 'url must be a string');

  const options = merge({}, defaultOpts, opts);

  assert(typeof options.maskCharacter === 'string', 'maskCharacter must be a string');
  assert(options.maskCharacter.length === 1, 'maskCharacter must be a string of length 1');

  const urlObject = parser.parse(url);

  debug('Using options: %j', options);

  if (!urlObject.auth) {
    debug(`Userinfo not found in url ${url}. Returning without modification`);
    return url;
  }

  const maskString = options.maskCharacter.repeat(defaultOpts.maskLength);
  const idx = urlObject.auth.indexOf(':');
  if (idx !== -1) {
    urlObject.auth = options.maskUsername ? `${maskString}:${maskString}` : `${urlObject.auth.substr(0, idx)}:${maskString}`;
  }

  return parser.format(urlObject);
}

module.exports = mask;
