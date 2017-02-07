var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    writer_id: {},
    contents: { type: String, default: "Content empty" },
    tag: { type: mongoose.Schema.ObjectId},
    emotion: String,
    image: { type: String, default: "http://www.dogdrip.net/files/attach/dvs/16/04/17/78/320/610/095/72c4fe51d63c8775911104a0dc97e00b.jpg"},
    comments: { profile_name: String, profile_image: String },
    reg_time: { type: Date, default: Date.now },
    is_more_comment: { type: Boolean, default: false }
});

module.exports = mongoose.model('article', articleSchema);

