'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newBridge;

describe('Bridge API:', function() {
  describe('GET /api/bridges', function() {
    var bridges;

    beforeEach(function(done) {
      request(app)
        .get('/api/bridges')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          bridges = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      bridges.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/bridges', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/bridges')
        .send({
          name: 'New Bridge',
          info: 'This is the brand new bridge!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newBridge = res.body;
          done();
        });
    });

    it('should respond with the newly created bridge', function() {
      newBridge.name.should.equal('New Bridge');
      newBridge.info.should.equal('This is the brand new bridge!!!');
    });
  });

  describe('GET /api/bridges/:id', function() {
    var bridge;

    beforeEach(function(done) {
      request(app)
        .get(`/api/bridges/${newBridge._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          bridge = res.body;
          done();
        });
    });

    afterEach(function() {
      bridge = {};
    });

    it('should respond with the requested bridge', function() {
      bridge.name.should.equal('New Bridge');
      bridge.info.should.equal('This is the brand new bridge!!!');
    });
  });

  describe('PUT /api/bridges/:id', function() {
    var updatedBridge;

    beforeEach(function(done) {
      request(app)
        .put(`/api/bridges/${newBridge._id}`)
        .send({
          name: 'Updated Bridge',
          info: 'This is the updated bridge!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedBridge = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBridge = {};
    });

    it('should respond with the updated bridge', function() {
      updatedBridge.name.should.equal('Updated Bridge');
      updatedBridge.info.should.equal('This is the updated bridge!!!');
    });

    it('should respond with the updated bridge on a subsequent GET', function(done) {
      request(app)
        .get(`/api/bridges/${newBridge._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let bridge = res.body;

          bridge.name.should.equal('Updated Bridge');
          bridge.info.should.equal('This is the updated bridge!!!');

          done();
        });
    });
  });

  describe('PATCH /api/bridges/:id', function() {
    var patchedBridge;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/bridges/${newBridge._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Bridge' },
          { op: 'replace', path: '/info', value: 'This is the patched bridge!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedBridge = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedBridge = {};
    });

    it('should respond with the patched bridge', function() {
      patchedBridge.name.should.equal('Patched Bridge');
      patchedBridge.info.should.equal('This is the patched bridge!!!');
    });
  });

  describe('DELETE /api/bridges/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/bridges/${newBridge._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when bridge does not exist', function(done) {
      request(app)
        .delete(`/api/bridges/${newBridge._id}`)
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
