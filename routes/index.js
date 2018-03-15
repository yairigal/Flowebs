var express = require('express');
var router = express.Router();
var data = require("../database/database");

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', data);
});

router.get('/logout', function (req, res) {
    data.currentUser = undefined;
    // res.sendFile(__dirname + '/views/WelcomePage.html');
    res.render("info", null);
});

router.post('/login', function (req, res) {
    data.currentUser = data.getUser(req);

    if (data.currentUser) // login ok
    // res.render('users-management', {data: data.getAllActiveUsers(), currentUser: data.currentUser});
        res.render('management-cards', data);
    else // login error
        res.send("BAD");
});

module.exports = router;
