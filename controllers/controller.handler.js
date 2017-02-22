
exports.initGraph = require('./server.init/init.graph').initGraph;
exports.initRedis = require('./server.init/init.redis').initRedis;
exports.initNewsfeed = require('./server.init/init.newsfeed').initNewsfeed;

// exports.setFriendReco = require('./set.friend.recommendation').setFriendReco;
exports.initFriendReco = require('./server.init/init.friend.reco');
exports.getFriendReco = require('./get.friend.recommendation').getFriendReco;
exports.pushNewsfeedArticle = require('./push.newsfeed.article').pushNewsfeedArticle;
exports.getNewsfeed = require('./get.newsfeed').getNewsfeed;



exports.graphAddFollow = require('./graph.add.follow').graphAddFollow;
exports.getArtureRecommendation = require('./get.arture.recommendation').getArtureRecommendation;
