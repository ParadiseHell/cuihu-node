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
        cuiHuModel.remove({_id:req.query.id},function (err,data) {
            mongoose.disconnect();
            console.log(data);
            if (err){
                res.json({
                    message : '删除失败',
                    isSuccess : false
                });
            }else {
                res.json({
                    message : '删除成功',
                    isSuccess : true
                });
            }
        })
    });
});

module.exports = router;