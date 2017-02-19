var Promise = require('bluebird');
var RedisClient = require('../app').RedisClient;
var getFriendReco = function(user_id){
    RedisClient.select(1);// Not sure this works in async manner
    return RedisClient.zrangeAsync(user_id, 0, -1) // return promise result to api
        .then(function(friendList) {
            return Promise.map(friendList, function (eachUser, index, length) { // promise map parameter 기억하자
                var friendReco = {};
                RedisClient.select(0);
                    return new Promise(function(resolved, rejected){
                        RedisClient.hgetallAsync(eachUser) // eachUser var is just string, so need to get user redis object from db0
                            .then(function(result){
                                friendReco.user_id = eachUser;
                                friendReco.name = result.name;
                                friendReco.image = result.image;
                            })
                            .then(function(result){
                                RedisClient.select(1);
                                RedisClient.zscoreAsync(user_id, eachUser)
                                    .then(function(result){
                                        friendReco.numSharing= result;
                                        resolved(friendReco); // resolved result for hgetallAsync
                                    })
                            })
                    });
                // }
            })
        })
        .then(function(result){
            return new Promise(function (resolved, rejected){
                if(result == undefined)
                    rejected('Fail to get friend recommendation list from redis');
                else {
                    console.log(result);
                    resolved(result);

                }
            })
        });
};


exports.getFriendReco = getFriendReco;