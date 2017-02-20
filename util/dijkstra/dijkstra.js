/**
 * Created by Jaehwa on 2/14/17.
 */
'use strict'
var Promise = require('bluebird');
module.exports = function(graph, sources, nodeType, edgeType){
    console.log('sadfsadfasdf')
    var result = [];
    var path = [];
    console.log(__filename);
    //inits
    for(let eachNode of graph.getNodes(nodeType)) {
        path[eachNode.index] = {dist: Infinity, visit: false};
    }
    for (let eachSource of sources) {
        let temp = graph.find(eachSource.toString(), nodeType);
        if (!temp) {
            console.error("Can't find source in graph ",__filename);
        }
        path[eachSource].dist = 0;
    }

    for(let i = 0 ; i < graph.getNodes(nodeType).length; i++){
        let minNode = graph.getMinNodeNotVisit(path, nodeType);

        if(minNode) {
            path[minNode.index].visit = true;
            if(path[minNode.index].dist)
                result.push(minNode.index);
            // if(result.length >= 2)

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
    console.log(path,'-----------');

    return result;
};
