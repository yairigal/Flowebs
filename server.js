var express = require("express");
var app = express();
var path = require("path");
var data = require("./database/database");


app.set("view engine", 'ejs');
// These lines are for req.body
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, 'public')));


function initGet() {
    app.get('/', function (req, res) {
        res.render('index', data);
    });

    app.get('/catalog', function (req, res) {
        res.render('Catalog', data);
    });

    app.get('/users', function (req, res) {
        // let uid =  data.users[req.query["id"]];
        res.render('users-management', {data: data.getAllActiveUsers(), currentUser: data.currentUser});
    });

    app.get('/branches', function (req, res) {
        res.render('branches_man', data);
    });

    app.get('/logout', function (req, res) {
        data.currentUser = undefined;
        // res.sendFile(__dirname + '/views/WelcomePage.html');
        res.render("info", null);
    });
}

function initPost() {

    app.post('/get_user', function (req, res) {
        let userid = req.body.id;
        let user = data.users[userid];
        res.send(user);
    });

    app.post('/add_user', function (req, res) {
        let user = req.body;
        let result = data.addUser(user);
        if(! result === true)
            console.log(result.message);
        res.render('users-management', {data: data.getAllActiveUsers(), currentUser: data.currentUser});
    });

    app.post('/edit_user', function (req, res) {
        let user = req.body;
        let result = data.editUser(user);
        if(! result === true)
            console.log(result.message);
        res.render('users-management', {data: data.getAllActiveUsers(), currentUser: data.currentUser});
    });

    app.post('/del_user', function (req, res) {
        let result = data.deactivateUser(req.query.id);
        if(! result === true)
            console.log(result.message);
        res.render('users-management', {data: data.getAllActiveUsers(), currentUser: data.currentUser});
    });

    app.post('/login', function (req, res) {
        data.currentUser = getUser(req);

        if (data.currentUser) // login ok
            res.render('users-management', {data: data.getAllActiveUsers(), currentUser: data.currentUser});
            // res.render('management-cards', data);
        else // login error
            res.send("BAD");
    });
}

function generateId() {
    let ids = data.users(x => x.id);
    return ids.max()+1;
}

function getUser(req) {
    let username = req.body.username;
    let pass = req.body.pass;
    let cUser;

    for (let user in data.users){
        if (data.users[user].username === username)
                if (data.users[user].password === pass) {
                    cUser = data.users[user];
                    break;
                }
    }
    return cUser;
}

initGet();
initPost();
app.listen(3000);
console.log("Running at Port 3000");