var express = require('express');
var router = express.Router();

const usersTimeout = 200;
const addUserTimeout = 6000;
const editUserTimeout = 6000;
const delUserTimeout = 4000;

/* GET users listing. */
router.get('/', function (req, res) {
    // let uid =  data.users[req.query["id"]];
    setTimeout(() => {
        res.render('users-management', {data: data.getAllActiveUsers(), currentUser: data.currentUser});
    }, usersTimeout);
});

router.post('/get_user', function (req, res) {
    let userid = req.body.id;
    let user = data.users[userid];
    res.send(user);
});

router.post('/add_user', function (req, res) {
    setTimeout(() => {
        let user = req.body;
        let result = data.addUser(user);
        if (!result === true)
            console.log(result.message);
        res.render('users-management', {data: data.getAllActiveUsers(), currentUser: data.currentUser});
    }, addUserTimeout);
});

router.post('/edit_user', function (req, res) {
    setTimeout(() => {
        let user = req.body;
        let result = data.editUser(user);
        if (!result === true)
            console.log(result.message);
        res.render('users-management', {data: data.getAllActiveUsers(), currentUser: data.currentUser});
    }, editUserTimeout);
});

router.post('/del_user', function (req, res) {
    setTimeout(() => {
        let result = data.deactivateUser(req.query.id);
        if (!result === true)
            console.log(result.message);
        res.render('users-management', {data: data.getAllActiveUsers(), currentUser: data.currentUser});
    }, delUserTimeout);
});

module.exports = router;
