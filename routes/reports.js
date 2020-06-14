var express = require('express');
var router = express.Router();
var datas = require('./data');
var reports = datas.reports;

/* GET users listing. */
router.get('/', function(req, res, next) {
    var _reports = reports.map(r => ({
        id: r.id,
        date: r.date,
        project: r.project,
        hours: r.hours
    }))
    res.json(_reports);
});

router.get('/:id', function(req, res, next) {
    var report = reports.find(r => r.id.toString() === req.params.id);
    if (report) {
        res.json(report);
    } else {
        res.json('400', 'Not Found');
    }
});

router.post('/', function(req, res, next) {
    var id = reports.length;
    var date = req.body.date ? req.body.date : "";
    var project = req.body.project ? req.body.project : "";
    var hours = req.body.hours ? req.body.hours : "";
    var detail = req.body.detail ? req.body.detail : "";

    if (!date || !hours || !project || !detail) {
        return res.json('404', "errors");
    }

    if (hours > 8) {
        return res.json('403', "超出工作時間");
    }

    reports.push({
        id: id,
        date: date,
        project: project,
        hours: hours,
        detail: detail
    })

    var report = reports.find(r => r.id.toString() === id.toString());

    if (report) {
        res.json(report);
    } else {
        res.json('400', 'Not Found');
    }
});

router.put('/:id', function(req, res, next) {

    var date = req.body.date ? req.body.date : "";
    var project = req.body.project ? req.body.project : "";
    var hours = req.body.hours ? req.body.hours : "";
    var detail = req.body.detail ? req.body.detail : "";

    if (!date || !hours || !project || !detail) {
        return res.json('404', "errors");
    }

    reports = reports.map(r => {
        if (r.id.toString() === req.params.id) {
            r.date = date;
            r.project = project;
            r.hours = hours;
            r.detail = detail;
        };
        return r;
    });

    var report = reports.find(r => r.id.toString() === req.params.id);

    res.json(report);
})

router.delete('/:id', function(req, res, next) {
    var report = reports.find(r => r.id.toString() === req.params.id);
    console.log(report);

    if (report) {
        reports = reports.filter(r => r.id !== report.id);
        res.json(true);
    } else {
        res.json('400', 'Not Found');
    }
});
module.exports = router;