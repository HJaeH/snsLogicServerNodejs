/**
 * Created by Jaehwa on 2/14/17.
 */
'use strict'
var Promise = require('bluebird');
module.exports = function(graph, sources, maxNumTofind, nodeType, edgeType){
    var targetNodes = nodeType?graph.getNodes(nodeType):graph.getNodes();
    var result = [];
    var path = [];

    //inits
    for(let eachNode of targetNodes) {
        path[eachNode.index] = {dist: Infinity, visit: false};
    }
    for (let eachSource of sources) {
        let temp = graph.find(eachSource.toString(), nodeType);
        if (!temp) {
            console.error("Can't find source in graph ",__filename);
        }
        path[eachSource].dist = 0;
    }
    //start to find
    for(let i = 0 ; i < targetNodes.length; i++){
        let minNode = graph.getMinNodeNotVisit(path, nodeType);
        if(minNode) {
            path[minNode.index].visit = true;
            if(nodeType){
                if(path[minNode.index].dist){
                    if(nodeType == 'userNode' && path[minNode.index].dist >= 2){ // userNode - > user recommendation -> less than dist 1 is already friends
                        result.push(minNode.index);
                    }
                    else if(nodeType == 'artureNode'){
                        result.push(minNode.index);
                    }
                }
            }
            else{
                if(minNode.type == 'userNode'){ // newsfeed pushing
                    if(path[minNode.index].dist < 3) //todo: 가중치// only close node less than 2 would get new article
                        result.push(minNode.index);
                }
            }

            if(result.length >= maxNumTofind) {
                // console.log(path,'---------1111--');
                // console.log(result);
                return result;
            }

            //원래 path 에 새로 찾은  minnode 를 visit하고 해당 노드의 에지를 추가
            minNode.getEdges(edgeType).forEach(function (eachArtureEdge) {
                let minNodeFirstNeighbor = eachArtureEdge.firstNode.index;
                let minNodeSecondNeighbor = eachArtureEdge.secondNode.index;
                if (minNodeFirstNeighbor != minNode.index) {
                    if (!path[minNodeFirstNeighbor].visit)
                        if (path[minNode.index].dist + eachArtureEdge.getDistance() < path[minNodeFirstNeighbor].dist) {
                            if (path[minNode.index].dist + eachArtureEdge.getDistance() != Infinity)
                                path[minNodeFirstNeighbor].dist = path[minNode.index].dist + eachArtureEdge.getDistance();
                        }
                }
                else if (minNodeSecondNeighbor != minNode.index) {
                    if (!path[minNodeSecondNeighbor].visit)
                        if (path[minNode.index].dist + eachArtureEdge.getDistance() < path[minNodeSecondNeighbor].dist) {
                            if (path[minNode.index].dist + eachArtureEdge.getDistance() != Infinity)
                                path[minNodeSecondNeighbor].dist = path[minNode.index].dist + eachArtureEdge.getDistance();
                        }
                }
            });
        }
    }

    // console.log(path,'---------1111--');
    // console.log(result);
    return result;
};
