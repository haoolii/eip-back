var express = require('express');
var router = express.Router();

/* GET employee listing. */
router.post('/', function(req, res, next) {
  var employeeCode = req.body.employeeCode;
  console.log('???', employeeCode);
    if (employeeCode === 'abc123') {
      return res.json(true);
    } else {
      return res.json('404', "errors");
    }
});

module.exports = router;