var Promise = require("bluebird");
var redisClient = require('../app').redisClient;

var getUserObjectById = function(id, userFriends){
    var i ;
    for(i = 0  ; i < userFriends.length; i++) {
        if (id.equals(userFriends[i]._id)) return userFriends[i]; // return object id

    }
    return false; // fails to find user object from db
}

var areFriendsEachOther = function (id1, id2, userFriends) { // get the object Ids

    userFriends.forEach(function(eachUser1, index){
        if(eachUser1._id === id1){
            eachUser1.friends.forEach(function(eachFriends){
                if(eachFriends._id === eachUser1._id){
                    return true;
                }
            });
        }
    });
    userFriends.forEach(function(eachUser2){
        if(eachUser2._id === id2){
            eachUser2.friends.forEach(function(eachFriends){
                if(eachFriends._id === id1){
                    return true;
                }
            })
        }
    });
    return false; //only the case where it fails to find

}


var setFriendReco = function(User){
    redisClient.flushall(); // update all redis data by flushing
    User.aggregate([
        {
            $match:
            {

            }
        },
        {
            $project: {
                // user_id: true,
                name: true,
                image: true
            }
        }]
    ).then(function(redisUsers){// redis users include only image, name, id.
        for(var i = 0; i < redisUsers.length; i++){
            redisClient.select(0);
            redisClient.hmset(redisUsers[i]._id.toString(), 'name', redisUsers[i].name, 'image', redisUsers[i].image);
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
                    user_id: true,
                    friends: true
                }
            }]
        )
        .then(function(userFriends) {
            redisClient.select(1);
            for(var i = 0; i < userFriends.length; i++) {
                for (var j = 0; j < userFriends[i].friends.length; j++) { // 친구 리스트 아이디를 받고
                    var eachFriend = getUserObjectById(userFriends[i].friends[j], userFriends);
                    console.log(eachFriend);
                    if (eachFriend) {
                        for (var k = 0; k < eachFriend.friends.length; k++) {
                            if (userFriends[i]._id != eachFriend.friends[k]) { // not itself
                                if(!areFriendsEachOther(userFriends[i]._id.toString(), eachFriend.friends[k], userFriends)){ // and not friends right now //
                                    console.log('check')
                                    redisClient.ZADD(userFriends[i]._id, "incr", 1, eachFriend.friends[k], function (err, data) { // then add
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