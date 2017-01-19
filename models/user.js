/**
 * Created by a on 1/13/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    user_id: String,
    name: String,
    friends:[Number],
    gender: Boolean,
    age: Number,
    registered_date: { type: Date, default: Date.now },
    post_list: [Number],
    image: { type: String, default: 'imageURL'}
});


module.exports = mongoose.model('user', userSchema);

