/**
 * Created by a on 2/1/17.
 */
var Promise = require('bluebird');
var getFriendReco = function(RedisClient, user_id, callback){

    
    var friendRecoList = [];
    RedisClient.select(1);// Not sure this works in async manner
    RedisClient.zrangeAsync(user_id, 0, -1)
        .then(function(friendList) {
            // console.log(friendList);
            return Promise.map(friendList, function (eachUser, index, length) { // promise map parameter 기억하자
                // console.log(index + "index");

                var friendReco = {};
                RedisClient.select(0);
                var temp = Number(eachUser); // redis sorted set include withscore option, odd number index is score.
                if(isNaN(temp)) {
                    // console.log(eachUser);
                    return new Promise(function(resolved, rejected){
                        RedisClient.hgetallAsync(eachUser)
                            .then(function(result){
                                // console.log(result);
                                // console.log(eachUser);
                                friendReco.user_id = eachUser;
                                friendReco.name = result.name;
                                friendReco.image = result.image;
                            })
                            .then(function(result){
                                RedisClient.select(1);
                                RedisClient.zscoreAsync(req.params.user_id, eachUser)
                                    .then(function(result){
                                        friendReco.score = result;
                                        resolved(friendReco);
                                    })
                            })
                    });
                }
            })
        })
        .then(function(result){
            // console.log(result);
            callback(result);
        });

    return false;

}


exports.getFriendReco = getFriendReco;