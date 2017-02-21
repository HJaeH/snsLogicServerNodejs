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


module.exports.getArtureRecommendation = function(userId, graph){
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
        var recoArtures = dijkstra(graph, arr, 5,'artureNode', 'artureEdge'); // get reco list
        console.log(recoArtures,"sadfsd")
        return Arture.find({ // get objects by id
            _id: {
                $in: recoArtures // find multiple matches
            }
        }).then(function(result){
            return new Promise(function(resolved, rejected){
                resolved(result);
            })
        })

        // console.log(dijkstra(graph, arr));
    })



}