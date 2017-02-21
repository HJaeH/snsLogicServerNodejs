/**
 * Created by a on 2/5/17.
 */
var RedisClient = require('../app').RedisClient;
var mongoose = require('mongoose');
// var ObjectId = mongoose.Types.ObjectId;
var Article = require('.././models/article');// model 부분 정리
var Promise = require('bluebird');
var getNewsfeed = function(user_id){
    RedisClient.select(2);
    return RedisClient.smembersAsync(user_id)
        .then(function(newsfeedIds){
            return Promise.map(newsfeedIds, function(newsfeedId){
                return Article.find({_id: newsfeedId})
                    .then(function(result){
                        return new Promise(function(resolved, rejected){
                            if(result != null)
                                resolved(result[0]) // 왜 리스트로 리턴되는지?,
                        })
                    })
            })
        })
        .then(function(result){
                var temp = result.sort(function(x, y){ // array sort function
                 return y.registered_time - x.registered_time;
                 });
                return new Promise(function (resolved, rejected){
                    if(temp != null)
                        resolved(temp);
                })
        })
}


module.exports.getNewsfeed = getNewsfeed;


