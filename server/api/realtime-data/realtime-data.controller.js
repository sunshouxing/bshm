/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/realtime-data/:id          ->  show
 */

'use strict';

import RealtimeData from './realtime-data.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
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

// Gets a single bridge from DB
export function show(req, res) {
  let channel = req.params.channel;
  let timestamp = req.query.timestamp;

  /* eslint-disable newline-per-chained-call, camelcase */
  return RealtimeData.find({channel_name: channel})
    .where('timestamp').gt(timestamp).sort('timestamp').exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
  /* eslint-enable */
}

