/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/files              ->  index
 * POST    /api/files              ->  create
 * GET     /api/files/upload       ->  check
 * POST    /api/files/upload       ->  upload
 * GET     /api/files/:id          ->  show
 * PUT     /api/files/:id          ->  upsert
 * PATCH   /api/files/:id          ->  patch
 * DELETE  /api/files/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import File from './file.model';
import * as flow from './flow';

const ACCESS_CONTROLL_ALLOW_ORIGIN = false;

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
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

// Gets a list of Files
export function index(req, res) {
  return File.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single File from the DB
export function show(req, res) {
  return File.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new File in the DB
export function create(req, res) {
  return File.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given File in the DB at the specified ID
export function upsert(req, res) {
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return File.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing File in the DB
export function patch(req, res) {
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return File.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a File from the DB
export function destroy(req, res) {
  return File.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Checks if the File has already existed
export function check(req, res) {
  flow.get(req, function(status, filename, originalFileName, identifier) {
    if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
      res.header('Access-Control-Allow-Origin', '*');
    }

    status = (status == 'found' ? 200 : 204);
    res.status(status).send();
  });
}

// Uploads the File
export function upload(req, res) {
  flow.post(req, function(status, filename, originalFileName, identifier) {
    if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
      res.header('Access-Control-Allow-Origin', '*');
    }

    res.status(/^(partly_done|done)$/.test(status) ? 200 : 500).send();
  });
}

// Downloads the File
export function download(req, res) {
  flow.write(req.params.identifier, res);
}
