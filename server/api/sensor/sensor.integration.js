'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newSensor;

describe('Sensor API:', function() {
  describe('GET /api/sensors', function() {
    var sensors;

    beforeEach(function(done) {
      request(app)
        .get('/api/sensors')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sensors = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      sensors.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/sensors', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sensors')
        .send({
          name: 'New Sensor',
          info: 'This is the brand new sensor!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSensor = res.body;
          done();
        });
    });

    it('should respond with the newly created sensor', function() {
      newSensor.name.should.equal('New Sensor');
      newSensor.info.should.equal('This is the brand new sensor!!!');
    });
  });

  describe('GET /api/sensors/:id', function() {
    var sensor;

    beforeEach(function(done) {
      request(app)
        .get(`/api/sensors/${newSensor._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sensor = res.body;
          done();
        });
    });

    afterEach(function() {
      sensor = {};
    });

    it('should respond with the requested sensor', function() {
      sensor.name.should.equal('New Sensor');
      sensor.info.should.equal('This is the brand new sensor!!!');
    });
  });

  describe('PUT /api/sensors/:id', function() {
    var updatedSensor;

    beforeEach(function(done) {
      request(app)
        .put(`/api/sensors/${newSensor._id}`)
        .send({
          name: 'Updated Sensor',
          info: 'This is the updated sensor!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSensor = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSensor = {};
    });

    it('should respond with the updated sensor', function() {
      updatedSensor.name.should.equal('Updated Sensor');
      updatedSensor.info.should.equal('This is the updated sensor!!!');
    });

    it('should respond with the updated sensor on a subsequent GET', function(done) {
      request(app)
        .get(`/api/sensors/${newSensor._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          let sensor = res.body;

          sensor.name.should.equal('Updated Sensor');
          sensor.info.should.equal('This is the updated sensor!!!');

          done();
        });
    });
  });

  describe('PATCH /api/sensors/:id', function() {
    var patchedSensor;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/sensors/${newSensor._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Sensor' },
          { op: 'replace', path: '/info', value: 'This is the patched sensor!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          patchedSensor = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedSensor = {};
    });

    it('should respond with the patched sensor', function() {
      patchedSensor.name.should.equal('Patched Sensor');
      patchedSensor.info.should.equal('This is the patched sensor!!!');
    });
  });

  describe('DELETE /api/sensors/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/sensors/${newSensor._id}`)
        .expect(204)
        .end(err => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when sensor does not exist', function(done) {
      request(app)
        .delete(`/api/sensors/${newSensor._id}`)
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
