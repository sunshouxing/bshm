'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var bridgeCtrlStub = {
  index: 'bridgeCtrl.index',
  show: 'bridgeCtrl.show',
  create: 'bridgeCtrl.create',
  upsert: 'bridgeCtrl.upsert',
  patch: 'bridgeCtrl.patch',
  destroy: 'bridgeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var bridgeIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './bridge.controller': bridgeCtrlStub
});

describe('Bridge API Router:', function() {
  it('should return an express router instance', function() {
    bridgeIndex.should.equal(routerStub);
  });

  describe('GET /api/bridges', function() {
    it('should route to bridge.controller.index', function() {
      routerStub.get
        .withArgs('/', 'bridgeCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/bridges/:id', function() {
    it('should route to bridge.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'bridgeCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/bridges', function() {
    it('should route to bridge.controller.create', function() {
      routerStub.post
        .withArgs('/', 'bridgeCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/bridges/:id', function() {
    it('should route to bridge.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'bridgeCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/bridges/:id', function() {
    it('should route to bridge.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'bridgeCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/bridges/:id', function() {
    it('should route to bridge.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'bridgeCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
