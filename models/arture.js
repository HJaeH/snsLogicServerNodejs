var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artureSchema = new Schema({
    title: String,
    image: String,
    followers: [mongoose.Schema.ObjectId],
    direct_relation:[mongoose.Schema.ObjectId]
}) ;

module.exports = mongoose.model('arture', artureSchema);