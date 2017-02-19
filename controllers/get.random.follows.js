/**
 * Created by Jaehwa on 2/18/17.
 */
'use strict'
var mongoose = require('mongoose')
var modelHandler = require('../models/model.handler');
var User = modelHandler.userModel;
var Arture = modelHandler.artureModel;
var ObjectId = mongoose.Types.ObjectId;
var dijkstra = require('../util/dijkstra/dijkstra');


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

        var arr = []
        for(let eachArtureId of result){
            arr.push(eachArtureId.follows.toString());
        }
        // console.log(arr)
        var recoArtures = dijkstra(graph, arr)

        Arture.find({
            _id: {
                $in: recoArtures
            }
        }).then(function(result){
            console.log(result)
        })

        // console.log(dijkstra(graph, arr));
    })
}