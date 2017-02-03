var Promise = require("bluebird");



var getUserObjectById = function(id, userFriends){
    var i ;
    for(i = 0  ; i < userFriends.length; i++) {
        if (id == userFriends[i].user_id) return userFriends[i];

    }
    return false;
}

var getUserObjectById1 = function(id, userFriends){
  /*  var i ;
    for(i = 0  ; i < userFriends.length; i++) { //each use
        if (id == userFriends[i]._id) return userFriends[i];

    }*/

    userFriends.forEach(function (eachUser, index) {
        if(eachUser._id === id) return eachUser;
    })
    return false;
}

var areFriendsEachOther = function (id1, id2, userFriends) {
    for(var i = 0 ; i < userFriends.length; i++) {
        if(userFriends[i].user_id == id1){ // find one of them
            for(var j = 0 ; j < userFriends[i].friends.length; j++){
                if(userFriends[i].friends[j] == id2 ){ // if they are friend
                    return true;
                }
            }
            return false;
        }
        else if(userFriends[i].user_id == id2){ //reverse them
            for(var j = 0 ; j < userFriends[i].friends.length; j++){
                if(userFriends[i].friends[j] == id1 ){ // if they are friend
                    return true;
                }
            }
        }
    }

    return false;



}
var areFriendsEachOther1 = function (id1, id2, userFriends) { // get the object Ids

    userFriends.forEach(function(eachUser1, index){
        if(eachUser1._id === id1){
            eachUser1.friends.forEach(function(eachFriends){
                if(eachFriends._id === eachUser1._id){
                    return true;
                }
            });
        }

    })


    userFriends.forEach(function(eachUser2){
        if(eachUser2._id === id2){
            eachUser2.friends.forEach(function(eachFriends){
                if(eachFriends._id === id1){
                    return true;
                }
            })

        }


    })
    return false;

}


var setFriendReco = function(redisClient, User){
    redisClient.flushall();
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
            // redisClient.hgetall(redisUsers[i].user_id).then( function(data){
            //     console.log(data);
            // });

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
                // userFriends[i].friendRecommendataionList = [];
                for (var j = 0; j < userFriends[i].friends.length; j++) { // 친구 리스트 아이디를 받고
                    var eachFriend = getUserObjectById1(userFriends[i].friends[j], userFriends);
                    if (eachFriend) {
                        for (var k = 0; k < eachFriend.friends.length; k++) {
                            if (userFriends[i]._id != eachFriend.friends[k]) { // not itself
                                if(!areFriendsEachOther1(userFriends[i]._id, eachFriend.friends[k], userFriends)){ // and not friends right now
                                    redisClient.ZADD(userFriends[i]._id, "incr", 1, eachFriend.friends[k], function (err, data) { // then add

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


// exports.setFriendReco = setFriendReco;
exports.createRecList = setFriendReco;