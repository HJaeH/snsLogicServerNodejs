

exports.setFriendReco = require('./set.friend.recommendation');
// exports.getFriendReco = require('./get.friend.recommendation');
exports.setArtureReco = require('./set.arture.recommendation');
exports.setNewsfeed = require('./set.newsfeed');


var getFriends = require('./get.friend.recommendation');
var a = function(redisClient, user){
    getFriends.getFriendReco(redisClient, user)
}

exports.a = a;
