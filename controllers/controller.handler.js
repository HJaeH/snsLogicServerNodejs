



exports.setFriendReco = require('./set.friend.recommendation').setFriendReco;
exports.getFriendReco = require('./get.friend.recommendation').getFriendReco;

exports.setNewsfeed = require('./set.newsfeed').setNewsfeed;
exports.getNewsfeed = require('./get.newsfeed').getNewsfeed;

// exports.setArtureGraph = require('./set.arture.graph').setArtureGraph;
exports.createGraph = require('./arture.recommendation/create.graph').createGraph;
// exports.createGraph1 = require('./arture.recommendation/createGraph').createGraph1;
// exports.setArtureReco = require('./arture.recommendation/set.arture.recommendation.js').setArtureReco;

exports.graphAddFollow = require('./graph.add.follow').graphAddFollow;
exports.getArtureRecommendation = require('./get.arture.recommendation').getArtureRecommendation;