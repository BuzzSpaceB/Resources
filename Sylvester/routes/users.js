var express = require('express');
var router = express.Router();


router.get('/viewResources', function(req, res, next) {

  	ResourcesModel.find(function (err, items) {
        res.json(items);
    });
});
module.exports = router;
