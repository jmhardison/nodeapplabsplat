////////////////////////////////////////
// nodeapplabsplat
// Copyright (c) 2018 Jonathan Hardison
////////////////////////////////////////


var express = require('express');
var config = require('../config');

//import initializeDB from '../db';
var statusController = require('../controllers/status');
var splatController = require('../controllers/splat');
var clearController = require('../controllers/clear');


let router = express();

//middleware

// v1 //
var v1Base = "/v1";
    
router.use(`${v1Base}/status`, statusController({config}));
router.use(`${v1Base}/splat`, splatController({config}));
router.use(`${v1Base}/clear`, clearController({config}));
    

module.exports = router;