/**
 * Created by Jaehwa on 2/21/17.
 */
/**
 * Created by Jaehwa on 2/17/17.
 */

'use strict'
var dijkstra = require('../../util/dijkstra/dijkstra');
var Promise = require('bluebird');
var modelHandeler = require('../../models/model.handler.js');
var User = modelHandeler.userModel;
var Arture = modelHandeler.artureModel;




var getShareUserNum = function(arture1, arture2){
    var count = 0;
    if((arture1.user_list && arture2.user_list) )
        arture1.user_list.forEach(function(eachFollower1){
            arture2.user_list.forEach(function(eachFollower2){
                if(eachFollower1.toString() === eachFollower2.toString()){
                    count++;
                }
            });
        });

    return count;
}
var isDirectRelation = function(arture1, arture2){
    var flag = false;
    arture1.related_arture_list.forEach(function(eachDirectRelation1){
        if(eachDirectRelation1.toString() === arture2._id.toString()){
            flag = true;
        }
    })
    if(flag) return true;
    else return false;
}
var i = 0, j=0 ;
var initGraph = function(graph){
    Arture.find(function(){
    }).then(function(artures){
        Promise.map(artures, function(eachArture) {
            graph.createNode('artureNode', eachArture._id.toString()); // create all arture node by id
            return new Promise(function(resolved, rejected){
                resolved(eachArture);
            });
        }).map(function(eachArture1){
            Promise.map(artures, function(eachArture2){
                if(eachArture1._id.toString() != eachArture2._id.toString()){
                    // console.log(i++)
                    var artureEdge = graph.createEdge('artureEdge').link( // create edge between every arture
                        graph.find(eachArture1._id.toString(), 'artureNode'),
                        graph.find(eachArture2._id.toString(), 'artureNode')
                    )
                    if(artureEdge){
                        var temp = isDirectRelation(eachArture1,eachArture2);
                        artureEdge.setProperty(getShareUserNum(eachArture1, eachArture2),temp);
                    }
                }
            });
        }).then(function(){
            User.find(function(){
            }).then(function(users){
                Promise.map(users, function(eachUser){
                    graph.createNode('userNode', eachUser._id.toString()); // create all user node by id
                    return new Promise(function(resolved, rejected){
                        resolved(eachUser);
                    });
                }).map(function(eachUser){
                    // console.log(eachUser)
                    Promise.map(eachUser.friend_list, function(eachFriend){
                        let firstNode = graph.find(eachUser._id.toString(), 'userNode');
                        let secondNode = graph.find(eachFriend.toString(), 'userNode');
                        if(!firstNode.edgeExist(secondNode)){
                            var userEdge = graph.createEdge('userEdge').link(firstNode, secondNode)
                            if(userEdge){
                                userEdge.setExplicitDistance(1);
                            }
                            else{
                                console.warn('Can not find node in graph',__filename);
                            }
                        }
                        else {
                            // console.warn("Index collision: index already exist in node list",__filename)

                        }
                    });
                    return new Promise(function(resolved, rejected){
                        resolved(eachUser);
                    });
                }).map(function(eachUser){
                    Promise.map(eachUser.arture_list, function(eachFollow){
                        let secondNode = graph.find(eachFollow.toString(), 'artureNode');
                        let firstNode = graph.find(eachUser._id.toString(), 'userNode');
                        // console.log(secondNode.index);
                        if(secondNode && firstNode){
                            if(!firstNode.edgeExist(secondNode)){

                                var userEdge = graph.createEdge('userArture').link(firstNode, secondNode)
                                if(userEdge){
                                    userEdge.setExplicitDistance(0.5);
                                }
                                else {
                                    console.warn('Can not find node in graph',__filename);
                                }
                            }
                            else {
                                // console.warn("Index collision while creating edge: index already exist in node list")

                            }
                        }
                    })
                }).then(function(){
                    console.log("Graph initiated ");
                })
            });
        });
    });

};
exports.initGraph = initGraph;