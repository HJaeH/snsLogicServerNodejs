var Promise = require('bluebird');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var db = mongoose.connection;
var Article = Promise.promisifyAll(require('.././models/article'));
var User = Promise.promisifyAll(require('../models/user'));
var Arture = Promise.promisifyAll(require('.././models/arture'));



db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

// VM db
// mongoose.connect('mongodb://192.168.1.208:27017/arture');

//Local db
mongoose.connect('mongodb://localhost:27017/arture');

var numArticle = 200;
User.aggregate([
    {
        $sample:{
            size: numArticle // number of article
        }
    }
]).then(function(randomUsers){
    Promise.map(randomUsers, function(randomUser, index){
        var article = new Article();
        article.contents = "안녕하세요 "+index+"번 째 글 입니다";
        article.writer_id = new ObjectId(randomUser._id);
        article.emotion = (index%2)?"Delighted":"Happy";
        // article.tag = "";
        article.comments = { profile_name: "지수", profile_image: "http://www.ikoreadaily.co.kr/news/photo/201602/223259_119465_43.jpg" }
        article.save(function(err, savedResult){ // put random user and random tag
            if(err){
                console.error(err);
                return;
            }
            User.update({_id: new ObjectId(randomUser._id)}, {$push: { article_list: savedResult._id } }, function (a1, b1, c1) {
            });


            Arture.aggregate([{
                $sample:{
                    size: numArticle
                }
            }, {
                $project:{
                    _id: true,
                    title: true
                }
            }]).then(function(randomArtures){
                Article.update({_id: new ObjectId(savedResult._id)}, {$set: { tag: randomArtures[index]._id} }, function (a, b, c) {

                });
            });
        });
    })
})





