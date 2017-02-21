'use strict'

var RedisClient = require('../app').RedisClient;
var modelHandler = require('../models/model.handler');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var User = modelHandler.userModel;
var Promise = require('bluebird')
var dijkstra = require('../util/dijkstra/dijkstra');

var setFriendReco = function(userId, maxNumToFind, graph){
    User.aggregate([
        {
            $match:{
                _id: new ObjectId(userId)
            }
        },
        {
            $project: {
                name: true,
                pic: true,
                friend_list: true
            }
        }]
    ).then(function(targetUser) {// redis users include only image, name, id.
        RedisClient.select(0);
        RedisClient.del(userId.toString());
        RedisClient.hmset(targetUser[0]._id.toString(), 'name', targetUser[0].name, 'image', targetUser[0].pic);
        return new Promise(function (resolved){
            resolved(targetUser[0]);
        });
    }).then(function(targetUser){
        var recoFriends = dijkstra(graph, [targetUser._id.toString()], maxNumToFind,'userNode', 'userEdge');
        RedisClient.select(1);
        for(let eachRecoUser of recoFriends){
            RedisClient.ZADD(userId.toString(), "incr", 1, eachRecoUser.toString(), function (err, data) {
            }); // then add
        }
    })

};

exports.setFriendReco = setFriendReco;

