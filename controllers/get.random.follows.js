/**
 * Created by Jaehwa on 2/18/17.
 */
'use strict'
var mongoose = require('mongoose')
var modelHandler = require('../models/model.handler');
var User = modelHandler.userModel;
var ObjectId = mongoose.Types.ObjectId;
var dijkstra = require('../util/dijkstra/dijkstra')

module.exports.getRandomFollows = function(userId, graph){
    User.aggregate(
        {
            $match: {
                _id: new ObjectId(userId)
            },
        },
        {
            $project: {
                follows: 1,
                _id: 0
            }
        },
        {
            $unwind: "$follows"
        },
        {
            $sample: {
                size: 5
            }
        }
    ).then(function(result){

        // ["58a7d67bdb534c1729fbe102", "58a7d67bdb534c1729fbe104", "58a7d67bdb534c1729fbe107"];
        var arr = []
        for(let eachArtureId of result){
            arr.push(eachArtureId.follows.toString());
        }
        console.log(dijkstra(graph, arr));
    })



}