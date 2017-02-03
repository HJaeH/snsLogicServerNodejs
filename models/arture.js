/*
/!**
 * Created by a on 1/31/17.
 *!/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var artureSchema = new Schema({
    title: String,
    image: String,
    followers: [],
}) ;



module.exports = mongoose.model('arture', artureSchema);*/
