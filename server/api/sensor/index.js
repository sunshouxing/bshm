'use strict';

var express = require('express');
var controller = require('./sensor.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/types', controller.types);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
