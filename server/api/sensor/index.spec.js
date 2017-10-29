'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var sensorCtrlStub = {
  index: 'sensorCtrl.index',
  show: 'sensorCtrl.show',
  create: 'sensorCtrl.create',
  upsert: 'sensorCtrl.upsert',
  patch: 'sensorCtrl.patch',
  destroy: 'sensorCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var sensorIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './sensor.controller': sensorCtrlStub
});

describe('Sensor API Router:', function() {
  it('should return an express router instance', function() {
    sensorIndex.should.equal(routerStub);
  });

  describe('GET /api/sensors', function() {
    it('should route to sensor.controller.index', function() {
      routerStub.get
        .withArgs('/', 'sensorCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/sensors/:id', function() {
    it('should route to sensor.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'sensorCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/sensors', function() {
    it('should route to sensor.controller.create', function() {
      routerStub.post
        .withArgs('/', 'sensorCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/sensors/:id', function() {
    it('should route to sensor.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'sensorCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/sensors/:id', function() {
    it('should route to sensor.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'sensorCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/sensors/:id', function() {
    it('should route to sensor.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'sensorCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
