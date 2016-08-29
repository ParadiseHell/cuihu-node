var express = require('express');
var router = express.Router();
var cuiHuEntity = require('../entity/cuiHuEntity');
var mongoose = require('mongoose');
var cuiHuModel = require('../models/cuiHuModel');

/* GET users listing. */
router.post('/add', function(req, res, next) {
  cuiHuEntity = req.body;
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
