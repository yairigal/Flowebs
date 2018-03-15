let express = require('express');
let multer = require('multer');
let router = express.Router();

let storage = multer.diskStorage({
    destination: "public/images/flowers",
    filename: function (req, file, cb) {
        cb(null, file.originalname);
        //cb(null, file.fieldname + '-' + Date.now())
    }
});

let upload = multer({storage: storage});

router.post('/upload', upload.single('pic'), function (req, res, next) {
    data.flowers.push({
        src: '/images/flowers/' + req.file.originalname,
        price: "$25.99",
        name: "Flower x",
        desc: "Random Stuff",
        color: "blue"
    });
    res.render('catalog', data);
});

router.post('/upload-url', function (req, res, next) {
    data.flowers.push({src: req.body.src, price: "$25.99", name: "Flower x", desc: "Random Stuff", color: "blue"});
    res.render('catalog', data);
});

router.get('/', function (req, res) {
    res.render('catalog', data);
});

module.exports = router;
