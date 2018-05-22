'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newWarning;

describe('Warning API:', function() {
  describe('GET /api/warnings', function() {
    var warnings;

    beforeEach(function(done) {
      request(app)
        .get('/api/warnings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          warnings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      warnings.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/warnings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/warnings')
        .send({
          name: 'New Warning',
          info: 'This is the brand new warning!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newWarning = res.body;
          done();
        });
    });

    it('should respond with the newly created warning', function() {
      newWarning.name.should.equal('New Warning');
      newWarning.info.should.equal('This is the brand new warning!!!');
    });
  });

  describe('GET /api/warnings/:id', function() {
    var warning;

    beforeEach(function(done) {
      request(app)
        .get(`/api/warnings/${newWarning._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          warning = res.body;
          done();
        });
    });

    afterEach(function() {
      warning = {};
    });

    it('should respond with the requested warning', function() {
      warning.name.should.equal('New Warning');
      warning.info.should.equal('This is the brand new warning!!!');
    });
  });

  describe('PUT /api/warnings/:id', function() {
    var updatedWarning;

    beforeEach(function(done) {
      request(app)
        .put(`/api/warnings/${newWarning._id}`)
        .send({
          name: 'Updated Warning',
          info: 'This is the updated warning!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedWarning = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedWarning = {};
    });

    it('should respond with the updated warning', function() {
      updatedWarning.name.should.equal('Updated Warning');
      updatedWarning.info.should.equal('This is the updated warning!!!');
    });

    it('should respond with the updated warning on a subsequent GET', function(done) {
      request(app)
        .get(`/api/warnings/${newWarning._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let warning = res.body;

          warning.name.should.equal('Updated Warning');
          warning.info.should.equal('This is the updated warning!!!');

          done();
        });
    });
  });

  describe('PATCH /api/warnings/:id', function() {
    var patchedWarning;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/warnings/${newWarning._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Warning' },
          { op: 'replace', path: '/info', value: 'This is the patched warning!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedWarning = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedWarning = {};
    });

    it('should respond with the patched warning', function() {
      patchedWarning.name.should.equal('Patched Warning');
      patchedWarning.info.should.equal('This is the patched warning!!!');
    });
  });

  describe('DELETE /api/warnings/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/warnings/${newWarning._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when warning does not exist', function(done) {
      request(app)
        .delete(`/api/warnings/${newWarning._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
