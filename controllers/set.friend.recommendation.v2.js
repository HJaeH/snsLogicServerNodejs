var RedisClient = require('../app').RedisClient;
var modelHandler = require('../models/model.handler');
var User = modelHandler.userModel;


//todo : 친구가 된 두 유저의 친구들 까지만 레디스를 업데이트
var getUserObjectById = function (id, userFriends) {
    var i;
    for (i = 0; i < userFriends.length; i++) {

        if (id == userFriends[i]._id.toString()) {
            return userFriends[i];
        } // return object id

    }
    return false; // fails to find user object from db
};

var areFriendsEachOther = function (id1, id2, userFriends) { // get the object Ids

    userFriends.forEach(function(eachUser1){
        if(eachUser1._id === id1){
            eachUser1.friend_list.forEach(function(eachFriends){
                if(eachFriends._id === eachUser1._id){
                    return true;
                }
            });
        }
    });
    userFriends.forEach(function(eachUser2){
        if(eachUser2._id === id2){
            eachUser2.friend_list.forEach(function(eachFriends){
                if(eachFriends._id === id1){
                    return true;
                }
            })
        }
    });
    return false; //only the case where it fails to find

}


var setFriendReco = function(){


    User.find().then(function(result){
        console.log(result,'a=======')
    })
    RedisClient.flushall(); // update all redis data by flushing
    User.aggregate([
        {
            $project: {
                name: true,
                pic: true
            }
        }]
    ).then(function(redisUsers){// redis users include only image, name, id.
        console.log(redisUsers);
        for(var i = 0; i < redisUsers.length; i++){
            RedisClient.select(0);
            RedisClient.hmset(redisUsers[i]._id.toString(), 'name', redisUsers[i].name, 'image', redisUsers[i].pic);
        }
    });


    User.aggregate([
        {
            $match:
                {

                }
        },
        {
            $project: {
                name: true,
                friend_list: true
            }
        }]
    )
        .then(function(userFriends) {
            RedisClient.select(1);
            for(var i = 0; i < userFriends.length; i++) {
                for (var j = 0; j < userFriends[i].friend_list.length; j++) { // 친구 리스트 아이디를 받고
                    var eachFriend = getUserObjectById(userFriends[i].friend_list[j], userFriends);
                    if (eachFriend) {
                        for (var k = 0; k < eachFriend.friend_list.length; k++) {
                            if (userFriends[i]._id != eachFriend.friend_list[k]) { // not itself
                                if(!areFriendsEachOther(userFriends[i]._id.toString(), eachFriend.friend_list[k], userFriends)){ // and not friends right now //
                                    // console.log(userFriends[i]._id.toString(), eachFriend.friend_list[k], userFriends , "----------------")

                                    RedisClient.ZADD(userFriends[i]._id.toString(), "incr", 1, eachFriend.friend_list[k].toString(), function (err, data) { // then add
                                        if(err) console.log('redis adding to sorted list error')

                                    });
                                }
                            }
                        }
                    }
                }
            }
        })
        .then(function(){

        });
};

exports.setFriendReco = setFriendReco;