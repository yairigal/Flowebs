var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('branches_man', data);
});

module.exports = router;
