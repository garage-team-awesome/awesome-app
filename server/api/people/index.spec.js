'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var peopleCtrlStub = {
  index: 'peopleCtrl.index',
  show: 'peopleCtrl.show',
  create: 'peopleCtrl.create',
  update: 'peopleCtrl.update',
  destroy: 'peopleCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var peopleIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './people.controller': peopleCtrlStub
});

describe('People API Router:', function() {

  it('should return an express router instance', function() {
    expect(peopleIndex).to.equal(routerStub);
  });

  describe('GET /api/people', function() {

    it('should route to people.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'peopleCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/people/:id', function() {

    it('should route to people.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'peopleCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/people', function() {

    it('should route to people.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'peopleCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/people/:id', function() {

    it('should route to people.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'peopleCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/people/:id', function() {

    it('should route to people.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'peopleCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/people/:id', function() {

    it('should route to people.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'peopleCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
