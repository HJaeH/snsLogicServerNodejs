/**
 * Created by Jaehwa on 2/20/17.
 */
'use strict'
var Mongoose = require('mongoose');
var ObjectId = Mongoose.Types.ObjectId;
var Promise = require('bluebird');
var RedisClient = require('../app').RedisClient;
var dijkstra = require('../util/dijkstra/dijkstra');


var pushNewsfeedArticle = function(userId, articleId, tagId, graph){
    var userNode = graph.find(userId.toString(), 'userNode');
    // console.log(userNode)
    console.log(tagId.toString(), "a--------")
    var tagNode  = graph.find(tagId.toString(), 'artureNode');
    console.log(tagNode)
    if(!userNode){
        console.error("User ID is not in graph",__filename);
    }
    else if(!tagNode) {
        console.error("Tag ID is not in graph",__filename);
    }
    else {
        var articlePushUsers = dijkstra(graph, [userId.toString(), tagId.toString()] , 20);

        Promise.map(articlePushUsers, function(eachUser){
            RedisClient.saddAsync(eachUser.toString(), articleId.toString())
        });
    }

};

exports.pushNewsfeedArticle = pushNewsfeedArticle