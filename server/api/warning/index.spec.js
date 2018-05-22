'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var warningCtrlStub = {
  index: 'warningCtrl.index',
  show: 'warningCtrl.show',
  create: 'warningCtrl.create',
  upsert: 'warningCtrl.upsert',
  patch: 'warningCtrl.patch',
  destroy: 'warningCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var warningIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './warning.controller': warningCtrlStub
});

describe('Warning API Router:', function() {
  it('should return an express router instance', function() {
    warningIndex.should.equal(routerStub);
  });

  describe('GET /api/warnings', function() {
    it('should route to warning.controller.index', function() {
      routerStub.get
        .withArgs('/', 'warningCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/warnings/:id', function() {
    it('should route to warning.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'warningCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/warnings', function() {
    it('should route to warning.controller.create', function() {
      routerStub.post
        .withArgs('/', 'warningCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/warnings/:id', function() {
    it('should route to warning.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'warningCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/warnings/:id', function() {
    it('should route to warning.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'warningCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/warnings/:id', function() {
    it('should route to warning.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'warningCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
