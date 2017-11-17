'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newChannel;

describe('Channel API:', function() {
  describe('GET /api/channels', function() {
    var channels;

    beforeEach(function(done) {
      request(app)
        .get('/api/channels')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          channels = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      channels.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/channels', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/channels')
        .send({
          name: 'New Channel',
          info: 'This is the brand new channel!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newChannel = res.body;
          done();
        });
    });

    it('should respond with the newly created channel', function() {
      newChannel.name.should.equal('New Channel');
      newChannel.info.should.equal('This is the brand new channel!!!');
    });
  });

  describe('GET /api/channels/:id', function() {
    var channel;

    beforeEach(function(done) {
      request(app)
        .get(`/api/channels/${newChannel._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          channel = res.body;
          done();
        });
    });

    afterEach(function() {
      channel = {};
    });

    it('should respond with the requested channel', function() {
      channel.name.should.equal('New Channel');
      channel.info.should.equal('This is the brand new channel!!!');
    });
  });

  describe('PUT /api/channels/:id', function() {
    var updatedChannel;

    beforeEach(function(done) {
      request(app)
        .put(`/api/channels/${newChannel._id}`)
        .send({
          name: 'Updated Channel',
          info: 'This is the updated channel!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedChannel = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedChannel = {};
    });

    it('should respond with the updated channel', function() {
      updatedChannel.name.should.equal('Updated Channel');
      updatedChannel.info.should.equal('This is the updated channel!!!');
    });

    it('should respond with the updated channel on a subsequent GET', function(done) {
      request(app)
        .get(`/api/channels/${newChannel._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          let channel = res.body;

          channel.name.should.equal('Updated Channel');
          channel.info.should.equal('This is the updated channel!!!');

          done();
        });
    });
  });

  describe('PATCH /api/channels/:id', function() {
    var patchedChannel;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/channels/${newChannel._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Channel' },
          { op: 'replace', path: '/info', value: 'This is the patched channel!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          patchedChannel = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedChannel = {};
    });

    it('should respond with the patched channel', function() {
      patchedChannel.name.should.equal('Patched Channel');
      patchedChannel.info.should.equal('This is the patched channel!!!');
    });
  });

  describe('DELETE /api/channels/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/channels/${newChannel._id}`)
        .expect(204)
        .end(err => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when channel does not exist', function(done) {
      request(app)
        .delete(`/api/channels/${newChannel._id}`)
        .expect(404)
        .end(err => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
});
