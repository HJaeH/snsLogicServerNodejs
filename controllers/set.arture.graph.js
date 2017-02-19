var Graph = require('../util/graph/graph');
var dijkstra = require('../util/dijkstra/dijkstra');
var Promise = require('bluebird');
var graph = new Graph();
var modelHandeler = require('../models/model.handler');
var bfs = require('../util/bfs/bfs');
var User = modelHandeler.userModel;
var Arture = modelHandeler.artureModel;

var setArtureGraph = function(){
    Arture.find().then(function(artures){
        Promise.map(artures, function(eachArture) {
            // console.log(eachArture)
            var a = graph.createNode('artureNode', eachArture._id.toString()); // create all arture node by id
            // console.log(a);
            return new Promise(function(resolved, rejected){
                resolved(eachArture);
            })
        }).map(function(eachArture) { // send eachArture and async control at the same time

            Promise.map(eachArture.related_arture_list, function(eachDirectRelation){
                var temp1 = graph.createEdge('artureEdge').link(
                    graph.find(eachArture._id.toString(), 'artureNode'),
                    graph.find(eachDirectRelation.toString(), 'artureNode')
                );
                if(temp1) temp1.setDistance(1);

                return new Promise(function(resolved, rejected){ // return empty promise object  just to control the async flow
                    resolved()
                })
            })
        })
    }).then(function(){
        User.find().then(function(users){
            return Promise.map(users, function(eachUser){
                graph.createNode('userNode', eachUser._id.toString()); // create Node for all users
                return new Promise(function(resolved, rejected){
                    resolved(eachUser);
                })
            }).map(function(eachUser){
                return Promise.map(eachUser._doc.arture_list, function(eachFollow){
                    var temp2 = graph.createEdge('userEdge').link(
                        graph.find(eachUser._doc._id.toString()),
                        graph.find(eachFollow.toString())
                    )

                    if(temp2) temp2.setDistance(1);
                    return new Promise(function(resolved, rejected){
                        resolved();
                    })

                });
            }).then(function(){
                // console.log(graph.getEdges('userEdge'));
            })
        }).then(function(){
            // dijkstra(graph,'58a53d36328d7554ab705d17');
            bfs(graph,'58a53d36328d7554ab705d17');

        });
    })


};

exports.setArtureGraph = setArtureGraph;
// TODO : 추천, 뉴스피드 코드 전부다 하나의 그래프에서 추출하도록 통합, 테스트 스크립트랑 서버상태 추적, 레디스 몽고 노드 서버 죽는상황
//한 유저에게 추천할 때에 해당 유저로부터 특정 기준에따라 몇개의 노드를 선택하고 노드들을 대표하는 하나의 노드를 생성,  연결된 간선만 새로 이어주고
// 최소 찾음