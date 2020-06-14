var express = require('express');
var router = express.Router();
var datas = require('./data');

var projects = datas.projects;

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json(projects);
});

module.exports = router;