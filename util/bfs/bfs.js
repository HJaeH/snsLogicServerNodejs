'use strict'
var Queue = require('../queue/queue');
var q = new Queue();
module.exports = function(graph, source){
    var sourceNode = graph.find(source);
    if(!sourceNode) {
        console.error("Can't find source");
        return false;
    }
    var path = [];
    for( let eachNode of graph.getNodes(sourceNode.type) ){
        path[eachNode.index] = {dist: Infinity, visit: false};
    }
    q.enqueue(source)
    path[source].dist = 0;
    while(q.first){ // until queue is empty
        var current = q.dequeue();
        path[current.index].visit = true;
        graph.find(current.index).getEdges('artureEdge').forEach(function (eachArtureEdge) {
            let currentFirstNeighbor = eachArtureEdge.firstNode.index;
            let currentSecondNeighbor = eachArtureEdge.secondNode.index;
            if (currentFirstNeighbor != current.index) {
                if(path[currentFirstNeighbor].visit != true){
                    q.enqueue(currentFirstNeighbor);
                    path[currentFirstNeighbor].dist = path[current.index].dist+1;
                }

            }
            else if (currentSecondNeighbor != current.index) {
                if(path[currentSecondNeighbor].visit != true){
                    q.enqueue(currentSecondNeighbor);
                    path[currentSecondNeighbor].dist = path[current.index].dist+1;
                }

            }
        });
    }
    console.log(path);
    return path;
}
