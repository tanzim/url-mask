'use strict';

const expect = require('expect.js');
const urlmask = require('../index');

function validate(input, output, opts) {
  expect(urlmask(input, opts)).to.eql(output);
}

describe('url-mask tests', () => {
  describe('Interface checks', (done) => {
    before(() => {
      expect(urlmask).to.be.ok();
      expect(urlmask).to.be.a('function');
      done();
    });
  });

  describe('Functional checks', () => {
    it('throws because url specified is not a string', (done) => {
      expect(urlmask).withArgs().to.throwException();
      expect(urlmask).withArgs(null).to.throwException();
      expect(urlmask).withArgs({}).to.throwException();
      expect(urlmask).withArgs([]).to.throwException();
      done();
    });

    it('throws because maskCharacter is invalid', (done) => {
      const url = 'http://github.com';
      expect(urlmask).withArgs(url, { maskCharacter: null }).to.throwException();
      expect(urlmask).withArgs(url, { maskCharacter: {} }).to.throwException();
      expect(urlmask).withArgs(url, { maskCharacter: [] }).to.throwException();
      expect(urlmask).withArgs(url, { maskCharacter: '' }).to.throwException();
      expect(urlmask).withArgs(url, { maskCharacter: '**' }).to.throwException();
      done();
    });

    describe('using default options', () => {
      it('returns unmodified url because userinfo is missing', (done) => {
        validate('http://github.com', 'http://github.com');
        done();
      });

      it('returns unmodified url because userinfo is missing', (done) => {
        validate('http://@github.com/', 'http://@github.com/');
        done();
      });

      it('returns modified (masked) url because userinfo has password', (done) => {
        validate('http://:secret@github.com/', 'http://*****:*****@github.com/');
        done();
      });

      it('returns modified (masked) url because userinfo has user and password', (done) => {
        validate('http://user:secret@github.com/', 'http://*****:*****@github.com/');
        done();
      });
    });

    describe('using overridden options', () => {
      it('returns modified (masked) url with custom mask character', (done) => {
        validate('http://user:secret@github.com/', 'http://-----:-----@github.com/', { maskCharacter: '-' });
        done();
      });

      it('returns unmodified url because maksing username is disabled', (done) => {
        validate('http://user@github.com/', 'http://user@github.com/', { maskUsername: false });
        done();
      });

      it('returns modified (masked) url because maksing username is disabled', (done) => {
        validate('http://user:secret@github.com/', 'http://user:*****@github.com/', { maskUsername: false });
        done();
      });
    });
  });
});
