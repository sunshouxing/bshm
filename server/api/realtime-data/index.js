'use strict';

var express = require('express');
var controller = require('./realtime-data.controller');

var router = express.Router();

router.get('/:channel', controller.show);

module.exports = router;
