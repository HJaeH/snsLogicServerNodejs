var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artureSchema = new Schema({
    title: String,
    num_followers: Number,
    followers: [mongoose.Schema.ObjectId],
    direct_relation:[mongoose.Schema.ObjectId],
    image: String
}) ;

module.exports = mongoose.model('arture', artureSchema);