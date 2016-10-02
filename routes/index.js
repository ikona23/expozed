var express = require('express');
var router = express.Router();
var getCams = require('../public/javascripts/data.json')
var _ = require('lodash')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expozed' });
});


module.exports = router;
