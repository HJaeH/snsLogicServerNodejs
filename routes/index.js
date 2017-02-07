/**
 * Created by a on 1/13/17.
 */
var Promise = require('bluebird');




module.exports = function(app, redisClient)
{
    var User = require( '.././models/user');
    var Article = require('.././models/article');
    var ControllerHandler = require('.././controllers/controller.handler');
    // get all users
    app.get('/api/v1/users', function(req,res){ // url should start with '/'
        User.find(function(err, users){
            res.setHeader('Access-Control-Allow-Origin', '*'); // for browser authentication
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(users);
        })
    });


    // get specific user
    app.get('/api/v1/users/:user_id', function(req, res){
        console.log("friends get");
        User.findOne({user_id: req.params.user_id}, function(err, user){
            res.setHeader('Access-Control-Allow-Origin', '*');
            if(err) return res.status(500).json({error: err});
            if(!user) return res.status(404).json({error: 'not found'});
            res.json(user);
        })
    });

    // get all articles
    app.get('/api/v1/users/:user_id/articles', function(req,res){
        console.log("article requested");
        Article.find(function(err, articles){
            res.setHeader('Access-Control-Allow-Origin', '*');
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
            res.setHeader('Access-Control-Allow-Origin', '*');
            if(err) return res.status(500).json({error: err});
            if(!article) return res.status(404).json({error: 'book not found'});
            res.json(article);
        })
    });



    //send friend recommendation list for each user
    app.get('/api/v1/users/:user_id/friends', function(req, res){
        ControllerHandler.getFriendReco(redisClient, req.params.user_id)
            .then(function(result){
                res.send(result);
            })

        // res.end()

    });

    // set friend list into redis
    app.post('/api/v1/users/:user_id/friends', function(req, res){ // from django
        ControllerHandler.setFriendReco(redisClient, User, function (err, result) {
            if(err)
                console.error("Fails to create recommendation list")

        });
        res.send("Friends recommendation list updated");
    });



    //send newsfeed list to client
    app.get('/api/v1/users/:user_id/newsfeed', function(req, res){
        // ControllerHandler.

    });

    // set newsfeed into redis
    app.post('/api/v1/users/:user_id/newsfeed', function(req, res){
        ControllerHandler.setNewsfeed(redisClient, User, req.params.user_id);
        res.send("user newsfeeds list updated");

    });

    //
    app.get('/api/v1/users/:user_id/friends/:friend', function(req, res){

        redisClient.select('0');
        console.log("friend get");
        res.setHeader('Access-Control-Allow-Origin', '*'); //

    });


    app.get('/api/v1/users/:user_id/new', function(req, res){

        redisClient.select('0');
        console.log("friend get");
        res.setHeader('Access-Control-Allow-Origin', '*'); //

    });




}
