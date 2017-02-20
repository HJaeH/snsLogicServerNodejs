var RedisClient = require('../app').RedisClient;
var modelHandler = require('../models/model.handler');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var User = modelHandler.userModel;
var Promise = require('bluebird')
var dijkstra = require('../util/dijkstra/dijkstra');

var setFriendReco = function(userId, graph){

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
        return new Promise(function (resolved, rejected) {
            resolved(targetUser[0]);
        });
    }).then(function(targetUser){
        console.log(targetUser);
        var arr= [];
        arr.push(targetUser._id.toString());
        targetUser.friend_list.forEach(function(eachFriend){
            arr.push(eachFriend);
        })

        var recoFriends = dijkstra(graph, arr, 'userNode', 'userEdge');
        console.log(recoFriends)
        RedisClient.select(1);




        /*RedisClient.ZADD(userFriends[i]._id.toString(), "incr", 1, eachFriend.friend_list[k].toString(), function (err, data) {

        }); // then add*/
    })

};

exports.setFriendReco = setFriendReco;


/////////
/*
return User.aggregate(
    {
        $match: {
            _id: new ObjectId(userId)
        },
    },
    {
        $project: {
            arture_list: 1,
            _id: 0
        }
    },
    {
        $unwind: "$arture_list"
    },
    {
        $sample: {
            size: 5
        }
    }
).then(function(result){
    console.log(result)

    var arr = []
    for(let eachArtureId of result){
        arr.push(eachArtureId.arture_list.toString());

    }
    console.log(arr)
    var recoArtures = dijkstra(graph, arr);
    // console.log(recoArtures);
    return Arture.find({
        _id: {
            $in: recoArtures
        }
    }).then(function(result){
        return new Promise(function(resolved, rejected){
            resolved(result);
        })
    })
*/

    // console.log(dijkstra(graph, arr));
// })


