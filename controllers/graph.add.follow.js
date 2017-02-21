/**
 * Created by Jaehwa on 2/18/17.
 */
var Promise = require('bluebird');
var modelHandeler = require('../models/model.handler');
var User = modelHandeler.userModel;



module.exports.graphAddFollow = function(graph, userId, followId){
    User.findOne({_id:userId}, function(){

    }).then(function(targetUser){
        var follows = targetUser._doc.arture_list;
        console.log(follows);
        follows.forEach(function(eachFollow){
            if(eachFollow.toString() != followId.toString()){
                var followNode = graph.find(eachFollow.toString(), 'artureNode');
                if(followNode){
                    // console.log(followNode.getEdges(),'-----------')
                    followNode.getEdges().forEach(function(eachEdge){
                        eachEdge.incShareUserNum();
                    })
                }
                else{
                 console.warn( "can not graph.find("+eachFollow+") in graph ");
                }
            }
        })
    });
}