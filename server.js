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
        res.render('user_namagment', data);
    });

    app.get('/branches', function (req, res) {
        res.render('branches_man', data);
    });

    app.get('/logout', function (req, res) {
        data.currentUser = undefined;
        res.sendFile(__dirname + '/views/WelcomePage.html');
    });
}

function initPost() {
    app.post('/add_user', function (req, res) {
        let user = req.body;
        user.id = generateId();
        data.users.push(user);
        res.render('user_namagment', data);
    });

    app.post('/get_user', function (req, res) {
        let userid = req.body.id;
        let user;
        for (i = 0; i < data.users.length; i++) {
            if (data.users[i].id == userid) {
                user = data.users[i];
                break;
            }
        }
        res.send(user);
    });

    app.post('/edit_user', function (req, res) {
        let user = req.body;
        let newUser;
        for (i = 0; i < data.users.length; i++)
            if (data.users[i].id == user.id) {
                newUser = data.users[i];
                break;
            }
        data.users.splice(data.users.indexOf(newUser), 1);
        data.users.push(user);
        res.render('user_namagment', data);
    });

    app.post('/login', function (req, res) {
        data.currentUser = getUser(req);

        if (data.currentUser) // login ok
            res.send('GOOD');
        else // login error
            res.send("BAD");
    });
}

function generateId() {
    return data.users.max((user) => {
        return user.id;
    }) + 1;
}

function getUser(req) {
    let username = req.body.username;
    let pass = req.body.pass;
    let cUser = undefined;
    data.users.forEach(function (user) {
        if (user.username == username)
            if (user.password == pass)
                cUser = user;
    });
    return cUser;
}

initGet();
initPost();
app.listen(3000);
console.log("Running at Port 3000");