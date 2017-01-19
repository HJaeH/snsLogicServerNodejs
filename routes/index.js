/**
 * Created by a on 1/13/17.
 */

module.exports = function(app)
{
    var User = require('../models/user');
    var Article = require('../models/article');
/*
    redisClient.set("language","nodejs",function(err,reply) {
        console.log(err);
        console.log(reply);
    });
    redisClient.sadd(['tags', 'angularjs', 'backbonejs', 'emberjs'], function(err, reply) {
        console.log(reply); // 3
    });

    */
    var clientArticles = {};


    // get all users
    app.get('/main/users', function(req,res){
        User.find(function(err, books){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(books);
        })
    });


    // get specific user
    app.get('/main/users/:user_id', function(req, res){
        User.findOne({user_id: req.params.user_id}, function(err, user){
            if(err) return res.status(500).json({error: err});
            if(!user) return res.status(404).json({error: 'book not found'});
            res.json(user);
        })
    });

    // get all articles
    app.get('/main/users/:user_id/articles', function(req,res){
        console.log("article requested");
        Article.find(function(err, articles){
            if(err) return res.status(500).send({error: 'database failure'});
/*
            articles.forEach(function(article) {
                article.user_idddd = dd
            })*/
            // articles.emotion = "aaaa";
            
            /*var temp = articles;
            temp.prototype.emotion = " hihihihi";
            */
            // articles.prototype.emotion = "dddd";
            // articles.prototype
            // console.log(temp);
            articles.forEach(function(article) {
                article._doc.writer_image = "http://cfile23.uf.tistory.com/image/1307BC424F554AD52088CD"
                article._doc.writer_name = "지수"

            });

            console.log( articles[0]);
            res.json(articles);

        })
    });

    // get article
    app.get('/main/users/:user_id/articles/:article_id', function(req, res){
        Article.findOne({writer_id: req.params.article_id}, function(err, article){
            if(err) return res.status(500).json({error: err});
            if(!article) return res.status(404).json({error: 'book not found'});
            res.json(article);
        })
    });

}
