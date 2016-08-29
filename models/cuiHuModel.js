var mongoose = require('mongoose');
var cuiHuSchema = require('../schemas/cuiHuSchema');
var cuiHuModel = mongoose.model('watchInfo',cuiHuSchema);

module.exports = cuiHuModel;