var fs = require('fs');
var expect = require('chai').expect;
var formidable = require('formidable');
var request = require('request');
var normalizeMultipart = require('../');
var httpUtils = require('./utils/http');
var serverUtils = require('./utils/server');

describe('An `eight-track` server using `normalize-multipart`', function () {
  serverUtils.run(1337, function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      res.send({
        err: err,
        fields: fields,
        files: files
      });
    });
  });
  serverUtils.runEightServer(1338, {
    url: 'http://localhost:1337',
    fixtureDir: __dirname + '/actual-files/normalize',
    normalizeFn: normalizeMultipart
  });

  describe('receiving a multipart form request', function () {
    before(function (done) {
      var r = httpUtils._save({
        method: 'POST',
        url: 'http://localhost:1338/'
      }).call(this, done);
      var form = r.form();
      form.append('hello', 'world');
    });
    before(function () {
      this.origBody = this.body;
    });

    it('processes the request', function () {
      console.log(this.body);
      // expect(JSON.parse(this.body)).to.have.property('fields');
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
