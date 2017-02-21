var Mongoose = require('mongoose');
var ObjectId = Mongoose.Types.ObjectId;
var Promise = require('bluebird');
var RedisClient = require('../../app').RedisClient;
//먼저 한 유저선택후 갸의 친구들 받고나서 그 친구들글 전체의 아티클 전체
// 걔의 팔로우를 받아서 아티클 전체를 조회후 팔로우 한 글 중 특정조건 만족하는 글
// 걔가 올린 모든 글 시간순서
var User = require('../../models/model.handler.js').userModel;

var initNewsfeed = function(user_id){

    // friend's articles
    RedisClient.select(2);
    RedisClient.del(user_id.toString());
    User.aggregate([
        {
            $match: {
                _id: (new ObjectId(user_id.toString()))
            }
        },
        {
            $project: {
                friend_list: true
            }
        },
        {
            $unwind: "$friend_list"
        },
        {
            $lookup: {
                from: "users_user",//from: "users",//from: "users_user",
                localField: "friend_list",
                foreignField: "_id",
                as: "friendArticleIds",
            }
        },
        {
            $unwind: "$friendArticleIds"
        },
        {
            $project:{
                "friendArticleIds.article_list": true
            }
        },
        {
            $unwind:"$friendArticleIds.article_list"
        }
    ]).then(function(results){
        // console.log("friends articles")
        // console.log(results)
        Promise.map(results, function(result){
            RedisClient.saddAsync(user_id, result.friendArticleIds.article_list.toString())
        });
    });
    // tag's articles
    User.aggregate([
        {
            $match: {
                _id: (new ObjectId(user_id))
            }
        },
        {
            $project: {
                arture_list: true
            }
        },
        {
            $unwind: "$arture_list"
        },
        {
            $lookup: {
                from: "users_article",//from: "articles", // from: "users_article",
                localField: "arture_list",
                foreignField: "tag",
                as: "followArticles"
            }
        },
        {
            $unwind: "$followArticles"
        },
        {
            $project:{
                "followArticles": true
            }
        }
    ]).then( function(results){
        // console.log("tag articles");
        // console.log(results);
        // RedisClient.select(2);
        Promise.map(results, function(result){
            RedisClient.saddAsync(user_id, result.followArticles._id.toString())
        });

    });
    // My articles
    User.aggregate([
        {
            $match: {
                _id: (new ObjectId(user_id))
            }
        },
        {
            $project:{
                "article_list": true
            }

        }
    ]).then(function(userArticlesList){
        Promise.map(userArticlesList, function(userArticle){
            // console.log("my articles");
            // console.log(userArticlesList);
            Promise.map(userArticle.article_list, function(article){
                RedisClient.saddAsync(user_id, article.toString());
            });
        });
    });
};

exports.initNewsfeed = initNewsfeed;