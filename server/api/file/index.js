'use strict';

var express = require('express');
var multiparty = require('connect-multiparty');
var controller = require('./file.controller');

var router = express.Router();
var multipartyMiddleware = multiparty();

router.get('/', controller.index);
router.get('/upload', controller.check);
router.post('/upload', multipartyMiddleware, controller.upload);
router.get('/download/:identifier', controller.download);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
