var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    // user_id: String,
    name: String,
    email : String,
    pwd: String,
    gender: Boolean,
    birth: String,
    address: String,
    registered_time: { type: Date, default: Date.now },
    pic: { type: String, default: 'imageURL'},
    friend_list : [{type: mongoose.Schema.ObjectId}],
    friend_request_list : [{type: mongoose.Schema.ObjectId}],
    article_list: [{type: mongoose.Schema.ObjectId}],
    arture_list: [{type: mongoose.Schema.ObjectId}],

});
module.exports = mongoose.model('users_user', userSchema, 'users_user');
// module.exports = mongoose.model('user', userSchema);