var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    user_id: { type: mongoose.Schema.ObjectId},
    tag: { type: mongoose.Schema.ObjectId},
    text: { type: String, default: "Empty" },
    image: { type: String },
    comment_list: {},
    registered_time: { type: Date, default: Date.now },
    is_more_comment: { type: Boolean, default: false },
});

// module.exports = mongoose.model('article', articleSchema);
module.exports = mongoose.model('users_article', articleSchema, 'users_article');




/*

contents: { type: String, default: "Content empty" },
emotion: String,
    image: { type: String, default: "http://www.dogdrip.net/files/attach/dvs/16/04/17/78/320/610/095/72c4fe51d63c8775911104a0dc97e00b.jpg"},
comments: { profile_name: String, profile_image: String },
reg_time: { type: Date, default: Date.now },
is_more_comment: { type: Boolean, default: false }


user_id = models.CharField(max_length=30) # insert user_objectId
tag = models.CharField(max_length=30) # insert arture objectId
text = models.TextField(null=True)
image = models.ImageField(null=True, upload_to='article_pictures')
emotion_list = ListField(null=True)
comment_list = ListField(EmbeddedModelField('Comment'), null=True)
#config = models.CharField(max_length=30)
registered_time = models.DateTimeField(auto_now_add=True)*/
