/**
 * Created by ChengTao on 2016-09-15.
 */
var express = require('express');
var router = express.Router();
var cuiHuModel = require('../models/cuiHuModel');
var mongoose = require('mongoose');
var result = require('../entity/resultEntity');
var assert = require('assert');


router.get('/',function (req,res,next) {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/cuihu');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        var query = cuiHuModel.find({_id:req.query.id});
        var promise = query.exec();
        promise.then(function (data) {
            result.singleData = data;
            result.isSuccess = true;
            res.render('detail',{
                title : '翠湖公园观察记录',
                data : result
            });
            mongoose.disconnect();
        });
    });
});

module.exports = router;