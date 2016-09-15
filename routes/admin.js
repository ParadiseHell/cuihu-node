var express = require('express');
var router = express.Router();
var cuiHuEntity = require('../entity/cuiHuEntity');
var mongoose = require('mongoose');
var cuiHuModel = require('../models/cuiHuModel');
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload/images');
  },
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, file.fieldname + '-' + Date.now()+ "." +fileFormat[fileFormat.length - 1]);
  }
});
var upload = multer({ storage: storage });

/* GET users listing. */
router.post('/add', upload.single('speciesPic'),function(req, res, next) {
  cuiHuEntity = req.body;
  cuiHuEntity.speciesPic = req.file.path.split("public\\")[1];
  console.log(req.file.path.split("public\\"));
  console.log(cuiHuEntity);
  mongoose.connect('mongodb://localhost/cuihu');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    var a = new cuiHuModel(cuiHuEntity);
    a.save(function (err, data) {
      if (err) return console.error(err);
      console.log(data);
      res.redirect('/');
      mongoose.disconnect();
    });
  });
});

router.get('/',function (req,res,next) {
  res.render('admin');
});

module.exports = router;
