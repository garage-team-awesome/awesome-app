/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/channels              ->  index
 * POST    /api/channels              ->  create
 * GET     /api/channels/:id          ->  show
 * PUT     /api/channels/:id          ->  update
 * DELETE  /api/channels/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Channel from './channel.model';

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
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
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

// Gets a list of Channels
export function index(req, res) {
  Channel.find().populate('owner messages.user')
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Channel from the DB
export function show(req, res) {
  Channel.findById(req.params.id).populate('owner messages.user')
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Channel in the DB
export function create(req, res) {
  Channel.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Channel in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Channel.findById(req.params.id).populate('owner messages.user')
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Channel from the DB
export function destroy(req, res) {
  Channel.findById(req.params.id).populate('owner messages.user')
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
