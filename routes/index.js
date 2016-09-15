var express = require('express');
var fs = require("fs");
var router = express.Router();
var cuiHuModel = require('../models/cuiHuModel');
var mongoose = require('mongoose');
var result = require('../entity/resultEntity');
var assert = require('assert');
/* GET home page. */
router.get('/', function(req, res, next) {
    var pages = 8;
    var index = req.query.index == undefined ? 1 : req.query.index;
    console.log(index);
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/cuihu');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        var query = cuiHuModel.find({});
        query.sort({updateAt : 'desc'}).skip((index-1)*pages).limit(pages+1);
        var promise = query.exec();
        promise.then(function (data) {
            result.MultiData = data;
            var currentCount = 0;
            var isNext = false;
            var currentIndex = index;
            if(data.length > pages){
                currentCount = data.length - 1;
                isNext = true;
            }else {
                currentCount = data.length;
            }
            res.render('index',{
                title : '翠湖观察信息浏览',
                data : result,
                currentCount : currentCount,
                isNext : isNext,
                currentIndex : currentIndex
            });
            mongoose.disconnect();
        });
    });
});


module.exports = router;
