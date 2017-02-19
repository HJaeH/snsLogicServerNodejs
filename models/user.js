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
/*

name = models.CharField(max_length=30)
email = models.EmailField(max_length=30)
pwd = models.CharField(max_length=30)
gender = models.BooleanField()
birth = models.CharField(max_length=8, null=True)
address = models.TextField(null=True)
registered_time = models.DateTimeField(auto_now_add=True)
pic = models.ImageField(null=True, upload_to=content_file_name, default='profile_pictures/default_picture/default.png')
friend_list = ListField()
friend_request_list = ListField(EmbeddedModelField('Request'), null=True)
arture_list = ListField() # insert arture ObjectId
article_list = ListField() # insert article ObjectId

*/

/*
email : String,
    name: String,
    friends:[Number],
    gender: Boolean,
    age: Number,
    registered_date: { type: Date, default: Date.now },
articles: [Number],
    image: { type: String, default: 'imageURL'}*/

// module.exports = mongoose.model('users_user', userSchema);
module.exports = mongoose.model('users_user', userSchema, 'users_user');
