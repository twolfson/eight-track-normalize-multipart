var fs = require('fs');
var expect = require('chai').expect;
var express = require('express');
var normalizeMultipart = require('../');
var httpUtils = require('./utils/http');
var serverUtils = require('./utils/server');

describe('An `eight-track` server using `normalize-multipart`', function () {
  serverUtils.run(1337, function (req, res) {
    express.multipart()(req, res, function (err) {
      if (err) { throw err; }
      res.send(req.body);
    });
  });
  serverUtils.runEightServer(1338, {
    url: 'http://localhost:1337',
    fixtureDir: __dirname + '/actual-files/normalize',
    normalizeFn: normalizeMultipart
  });

  describe('receiving a multipart form request', function () {
    httpUtils.save({
      url: 'http://localhost:1338/',
      multipart: [
        {'body': 'hello'},
        {'body': 'world'}
      ]
    });

    it('processes the request', function () {
      expect(this.err).to.equal(null);
      expect(JSON.parse(this.body)).to.equal('wat');
    });

    describe('receiving the same request but with different boundaries', function () {
      it('receives the same response', function () {

      });

      it('does not touch the server twice', function () {

      });

      describe('receiving a different request', function () {
        it('receives a different response', function () {

        });

        it('is a separate server touch', function () {

        });
      });
    });
  });
});
