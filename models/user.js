var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    user_id: String,
    name: String,
    friends:[Number],
    gender: Boolean,
    age: Number,
    registered_date: { type: Date, default: Date.now },
    articles: [Number],
    image: { type: String, default: 'imageURL'}
});
/*
var articleSchema = new Schema({
    user_id: String,
    contents: { type: String, default: "Content empty" },
    tag: { type : [], default: "IU" },
    image: { type: String, default: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT_sT3J6WYIzUcchaGDc9h_sSeIRCSeLEAcV4mRA3VHulwwFcJtLQ"},
    comments: { type: [Number], default: [1] },
    reg_time: { type: Date, default: Date.now },
});


var artureSchema = new Schema({
    title: String,
    image: String,
    followers: [],
}) */

// module.exports = mongoose.model('arture', artureSchema);
// module.exports = mongoose.model('article', articleSchema);
module.exports = mongoose.model('user', userSchema);

