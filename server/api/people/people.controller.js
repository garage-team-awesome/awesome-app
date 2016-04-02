/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/people              ->  index
 * POST    /api/people              ->  create
 * GET     /api/people/:id          ->  show
 * PUT     /api/people/:id          ->  update
 * DELETE  /api/people/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import People from './people.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Peoples
export function index(req, res) {
  return People.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single People from the DB
export function show(req, res) {
  return People.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new People in the DB
export function create(req, res) {
  return People.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing People in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return People.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a People from the DB
export function destroy(req, res) {
  return People.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
