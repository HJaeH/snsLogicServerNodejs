// var RedisClient = require('../app')();
var Promise = require('bluebird');
var Redis = require('redis');
// var RedisClient = require('../app').redisClient;
var Mongoose = require('mongoose');
var ObjectId = Mongoose.Types.ObjectId;

module.exports = function(app, RedisClient)
{
    var User = require( '../models/user');
    var Article = require('../models/article');
    var ControllerHandler = require('../controllers/controller.handler');


    //set all response headers
    app.get('/*',function(req,res,next){
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });

    // get all users
    app.get('/api/v1/users', function(req,res){
        User.find(function(err, users){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(users);
        })
    });


    // get specific user
    app.get('/api/v1/users/:user_id', function(req, res){
        console.log("friends get");

        User.findOne({user_id: new ObjectId (req.params.user_id) }, function(err, user){
            console.log(req.params.user_id);
            if(err) return res.status(500).json({error: err});
            if(!user) return res.status(404).json({error: 'not found'});
            res.json(user);
        })
    });

    // get all articles
    app.get('/api/v1/users/:user_id/articles', function(req,res){
        console.log("article requested");
        Article.find(function(err, articles){
            // res.setHeader('Access-Control-Allow-Origin', '*');
            if(err) return res.status(500).send({error: 'database failure'});
            articles.forEach(function(article) {
                article._doc.writer_image = "http://cfile23.uf.tistory.com/image/1307BC424F554AD52088CD"
                article._doc.writer_name = "지수"

            });
            res.json(articles);

        })
    });

    // get an article
    app.get('/api/v1/users/:user_id/articles/:article_id', function(req, res){
        Article.findOne({writer_id: req.params.article_id}, function(err, article){
            if(err) return res.status(500).json({error: err});
            if(!article) return res.status(404).json({error: 'book not found'});
            res.json(article);
        })
    });



    //get friend recommendation list of each user
    app.get('/api/v1/users/:user_id/friends', function(req, res){
        ControllerHandler.getFriendReco(RedisClient, req.params.user_id)
            .then(function(result){
                res.send(result);
            })
    });

    // set friend list into redis
    app.post('/api/v1/users/:user_id/friends', function(req, res){ // from django
        ControllerHandler.setFriendReco(RedisClient, User, function (err, result) {
            if(err)
                console.error("Fails to create recommendation list")

        });
        res.send("Friends recommendation list updated");
    });
    
    //get newsfeed of a user
    app.get('/api/v1/users/:user_id/newsfeed', function(req, res){
        ControllerHandler.getNewsfeed(req.params.user_id, RedisClient);
        res.end()
    });

    // set newsfeed into redis
    app.post('/api/v1/users/:user_id/newsfeed', function(req, res){
        ControllerHandler.setNewsfeed(User, req.params.user_id);
        res.send("user newsfeeds list updated");
    });

    // set Arture recommendation
    app.get('/api/v1/users/:user_id/artures', function(req, res){
        ControllerHandler.setArtureReco(RedisClient, Arture);
        res.send("arture recommendation ");
    });


}
