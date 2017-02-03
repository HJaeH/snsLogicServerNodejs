/**
 * Created by a on 2/1/17.
 */



/*
var Promise = require('bluebird');
var User = require('../../models/user');
var Article = require('../../models/article');*/

var user_id = "dd"; // from get request


// console.log("dd??")


var setNewsfeed = function(redisClient, User){

    User.aggregate([
        {
            $project: {
                friends: true,
                tag: true,
                articles: true
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "friends",
                foreignField: "user_id",
                as: "friendsArticles"
            },

        }
    ]).then(function(result){
        result.map(function(data){
            return data;
        })
    });
}




exports.setNewsfeed = setNewsfeed;