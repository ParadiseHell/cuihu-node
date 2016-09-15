var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cuiHuSchema = new Schema({
    title : { type : String , default : ""},
    speciesName : {type : String, default : "" },
    speciesPlace : { type : String, default : "" },
    writeInfoTime : { type : Date, default : Date.now() },
    watchTime : { type : Date, default : Date.now() },
    watchPlace : { type : String, default : "" },
    speciesPic : {type : String,default : ""},
    watchResult : { type : String, default : "" },
    watchPerson : { type : String , default : "" },
    watchNote : { type : String , default : "" },
    createAt : { type : Date, default : Date.now() },
    updateAt : { type : Date,  default : Date.now() }
});

cuiHuSchema.pre('save',function (next) {
    if (this.isNew){
        this.createAt = this.updateAt = Date.now();
    }else {
        this.updateAt = Date.now();
    }
    next();
});

cuiHuSchema.statics = {
    fetch : function (callback) {
        return this
            .find({})
            .sort('createAt')
            .exec(callback);
    },
    findById : function (id,callback) {
        return this
            .findOne({_id : id})
            .exec(callback);
    }
};

module.exports = cuiHuSchema;