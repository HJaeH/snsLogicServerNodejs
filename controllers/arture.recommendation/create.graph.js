/**
 * Created by Jaehwa on 2/17/17.
 */

'use strict'
// var Graph = require('../../util/graph/graph');
var dijkstra = require('../../util/dijkstra/dijkstra');
var Promise = require('bluebird');
var modelHandeler = require('../../models/model.handler');

var User = modelHandeler.userModel;
var Arture = modelHandeler.artureModel;
// console.log(User);
var getShareUserNum = function(arture1, arture2){
    var count = 0;
    arture1.user_list.forEach(function(eachFollower1){
        // console.log(eachFollower1);
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
            // console.log('In true branch')
            flag = true;
            // return true;
        }
    })
    if(flag) return true;
    else return false;
}

var createGraph = function(graph){


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
                    var artureEdge = graph.createEdge('artureEdge').link(
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
                    Promise.map(eachUser.friend_list, function(eachFriend){


                        let firstNode = graph.find(eachUser._id.toString(), 'userNode');
                        let secondNode = graph.find(eachFriend.toString(), 'userNode');
                        if(!firstNode.edgeExist(secondNode)){
                            var userEdge = graph.createEdge('userEdge').link(
                                graph.find(eachUser._id.toString(), 'userNode'),
                                graph.find(eachFriend.toString(), 'userNode')
                            )
                            if(userEdge){
                                userEdge.setExplicitDistance(1);
                            }
                        }
                        else {
                            console.warn("Index collision: index already exist in node list")

                        }
                    })
                }).then(function(){

                    // console.log(graph);
                })
            });
        });
    });
};
exports.createGraph = createGraph;
// TODO : 추천, 뉴스피드 코드 전부다 하나의 그래프에서 추출하도록 통합, 테스트 스크립트랑 서버상태 추적, 레디스 몽고 노드 서버 죽는상황