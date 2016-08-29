var express = require('express');
var fs = require("fs");
var router = express.Router();
var cuiHuModel = require('../models/cuiHuModel');
var mongoose = require('mongoose');
var result = require('../entity/resultEntity');
var assert = require('assert');
/* GET home page. */
router.get('/', function(req, res, next) {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/cuihu');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        var query = cuiHuModel.find({});
        var promise = query.exec();
        promise.then(function (data) {
            result.MultiData = data;
            result.currentCount = data.length;
            res.render('index',{
                title : '翠湖观察信息浏览',
                data : result
            });
            mongoose.disconnect();
        });
    });
});


module.exports = router;
