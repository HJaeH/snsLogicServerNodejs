/**
 * Created by Jaehwa on 2/17/17.
 */
// var Graph = require('../../util/graph/graph');
var dijkstra = require('../../util/dijkstra/dijkstra');
var Promise = require('bluebird');
var modelHandeler = require('../../models/model.handler');
var bfs = require('../../util/bfs/bfs');

var User = modelHandeler.userModel;
var Arture = modelHandeler.artureModel;
var getShareUserNum = function(arture1, arture2){
    var count = 0;
    arture1.followers.forEach(function(eachFollower1){
        // console.log(eachFollower1);
        arture2.followers.forEach(function(eachFollower2){
            if(eachFollower1.toString() === eachFollower2.toString()){
                count++;
            }
        });
    });

    return count;
}
var isDirectRelation = function(arture1, arture2){
    var flag = false;
    arture1.direct_relation.forEach(function(eachDirectRelation1){
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
            // bfs(graph,'58a7d67bdb534c1729fbe105')
        });
    });
};
exports.createGraph = createGraph;
// TODO : 추천, 뉴스피드 코드 전부다 하나의 그래프에서 추출하도록 통합, 테스트 스크립트랑 서버상태 추적, 레디스 몽고 노드 서버 죽는상황
//한 유저에게 추천할 때에 해당 유저로부터 특정 기준에따라 몇개의 노드를 선택하고 노드들을 대표하는 하나의 노드를 생성,  연결된 간선만 새로 이어주고
// 최소 찾음