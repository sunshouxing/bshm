'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var folderCtrlStub = {
  index: 'folderCtrl.index',
  show: 'folderCtrl.show',
  create: 'folderCtrl.create',
  upsert: 'folderCtrl.upsert',
  patch: 'folderCtrl.patch',
  destroy: 'folderCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var folderIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './folder.controller': folderCtrlStub
});

describe('Folder API Router:', function() {
  it('should return an express router instance', function() {
    folderIndex.should.equal(routerStub);
  });

  describe('GET /api/mail/folders', function() {
    it('should route to folder.controller.index', function() {
      routerStub.get
        .withArgs('/', 'folderCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/mail/folders/:id', function() {
    it('should route to folder.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'folderCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/mail/folders', function() {
    it('should route to folder.controller.create', function() {
      routerStub.post
        .withArgs('/', 'folderCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/mail/folders/:id', function() {
    it('should route to folder.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'folderCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/mail/folders/:id', function() {
    it('should route to folder.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'folderCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/mail/folders/:id', function() {
    it('should route to folder.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'folderCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
