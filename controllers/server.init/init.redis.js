/**
 * Created by Jaehwa on 2/21/17.
 */
'use strict'
var RedisClient = require('../../app').RedisClient;
var modelHandler = require('../../models/model.handler');
var User = modelHandler.userModel;
var controllerHandler = require('../controller.handler')


var initRedis = function() {
    RedisClient.flushall(); // update all redis data by flushing
    User.aggregate([
        {
            $project: {
                name: true,
                image: true,
                pic: true
            }
        }]
    ).then(function (redisUsers) {// redis users include only image, name, id.
        for (var i = 0; i < redisUsers.length; i++) {
            RedisClient.select(0);
            RedisClient.hmset(redisUsers[i]._id.toString(), 'name', redisUsers[i].name, 'image', redisUsers[i].pic);
        }
        return new Promise(function(resolved, rejected){
            resolved(redisUsers);
        })
    }).then(function(redisUsers){
        for(let eachUser of redisUsers){
            controllerHandler.initNewsfeed(eachUser._id.toString());
        }
    })


}


module.exports.initRedis = initRedis;