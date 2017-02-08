/**
 * Created by a on 2/5/17.
 */


var User = require('.././models/user');
var Article = require('.././models/article');
var Promise = require('bluebird');
// var RedisClient = require('../app').RedisClient;


var getNewsfeed = function(user_id, RedisClient){
    RedisClient.select(2);
    RedisClient.smembersAsync(user_id)
        .then(function(newsfeedIds){
            console.log(newsfeedIds);
            return Promise.map(newsfeedIds, function(newsfeedId){
                Article.find([{"_id": newsfeedId}])
                    .then(function(result){
                        console.log(result);
                    })
            })

        }
    )
}


module.exports.getNewsfeed = getNewsfeed;

// todo : read Redis and get the newsfeed list for a user and find article list from mongo

