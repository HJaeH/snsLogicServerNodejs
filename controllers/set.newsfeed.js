var Mongoose = require('mongoose');
var ObjectId = Mongoose.Types.ObjectId;
var Promise = require('bluebird');
var RedisClient = require('../app').redisClient;
//먼저 한 유저선택후 갸의 친구들 받고나서 그 친구들글 전체의 아티클 전체
// 걔의 팔로우를 받아서 아티클 전체를 조회후 팔로우 한 글 중 특정조건 만족하는 글
// 걔가 올린 모든 글 시간순서
// todo : pulling 조건 추가

var setNewsfeed = function(User, user_id){
    // console.log(User)

    User.aggregate([ // friend's articles
        {
          $match: {
              _id: (new ObjectId(user_id))
          }
        },
        {
            $project: {
                friends: true
                // tag: true,
                // articles: true
            }
        },
        {
          $unwind: "$friends"
        },
        {
            $lookup: {
                from: "users",
                localField: "friends",
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
        RedisClient.select(2);
        Promise.map(results, function(result){
            console.log(result)
            RedisClient.saddAsync(user_id, result.friendArticleIds.article_list.toString())
        });
    });


    User.aggregate([ // tag's articles
        {
            $match: {
                _id: (new ObjectId(user_id))
            }
        },
        {
            $project: {
                follows: true
            }
        },
        {
          $unwind: "$follows"
        },
        {
            $lookup: {
                from: "articles",
                localField: "follows",
                foreignField: "tag",
                as: "followArticles"
            }
        },
        {
            $unwind: "$followArticles"
        }/*,
        {
            $project:{
                "followingArticles._": true
            }
        }*/
    ]).then( function(results){ // 5896d2071db85b5fc04175d0  5896d2071db85b5fc04175ac 5896d2071db85b5fc0417594 5896d2071db85b5fc04175d0
        console.log(results);
        // followingArticles
        RedisClient.select(2);
        Promise.map(results, function(result){
            // console.log(result)
            RedisClient.saddAsync(user_id, result.followArticles._id.toString())
        });

    });

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

        },
        {
            $unwind: "$article_list"
        }
    ]).then(function(results){
        Promise.map(results, function(result){
            console.log(result.article_list);
            RedisClient.saddAsync(user_id, result.article_list.toString(), function(){

            });
        })
    })

};

exports.setNewsfeed = setNewsfeed;