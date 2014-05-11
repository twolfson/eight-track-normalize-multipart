var fs = require('fs');
var expect = require('chai').expect;
var formidable = require('formidable');
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
      // Make request
      var req = httpUtils._save({
        method: 'POST',
        url: 'http://localhost:1338/'
      }).call(this, done);

      // Before request completes, send some data
      var form = req.form();
      form.append('hello', 'world');
    });

    it('processes the request', function () {
      expect(this.err).to.equal(null);
      expect(JSON.parse(this.body).fields).to.have.property('hello', 'world');
    });

    describe('receiving the same request but with different boundaries', function () {
      before(function (done) {
        // Make request (it might look the same but boundaries are different)
        var req = httpUtils._save({
          method: 'POST',
          url: 'http://localhost:1338/'
        }).call(this, done);

        // Before request completes, send some data
        var form = req.form();
        form.append('hello', 'world');
      });

      it('receives the same response', function () {
        expect(this.err).to.equal(null);
        expect(JSON.parse(this.body).fields).to.have.property('hello', 'world');
      });

      it('does not touch the server twice', function () {
        expect(this.requests[1337]).to.have.property('length', 1);
      });

      describe('receiving a different request', function () {
        before(function (done) {
          var req = httpUtils._save({
            method: 'POST',
            url: 'http://localhost:1338/'
          }).call(this, done);
          var form = req.form();
          form.append('goodbye', 'moon');
        });

        it('receives a different response', function () {
          expect(this.err).to.equal(null);
          expect(JSON.parse(this.body).fields).to.have.property('goodbye', 'moon');
        });

        it('is a separate server touch', function () {
          expect(this.requests[1337]).to.have.property('length', 2);
        });
      });
    });
  });

  describe('receiving a GET request', function () {
    httpUtils.save('http://localhost:1338/');

    it('handles the request', function () {
      expect(this.err).to.equal(null);
      expect(this.res.statusCode).to.equal(200);
    });

    it('sends back no field data', function () {
      expect(JSON.parse(this.body)).to.deep.equal({err: null, fields: {}, files: {}});
    });

    it('is another server touch', function () {
      expect(this.requests[1337]).to.have.property('length', 3);
    });
  });
});
