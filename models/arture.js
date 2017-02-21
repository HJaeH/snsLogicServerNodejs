var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artureSchema = new Schema({
    title: String,
    image: String,
    article_list : [mongoose.Schema.ObjectId],
    user_list: [mongoose.Schema.ObjectId],
    arture_type: Boolean,
    description : String,
    related_arture_list:[mongoose.Schema.ObjectId],

}) ;

// module.exports = mongoose.model('arture', artureSchema);
module.exports = mongoose.model('users_arture', artureSchema, 'users_arture');
/*

title = models.CharField(max_length=30)
image = models.ImageField(null=True, upload_to='arture_pictures')
article_list = ListField(null=True)
user_list = ListField(null=True)
arture_type = models.BooleanField() # True : artist / False : art
description = models.TextField(null=True)
related_arture_list = ListField() # Insert Arture ObjectId


num_followers: Number,
    direct_relation:[mongoose.Schema.ObjectId],
    image: String
*/
