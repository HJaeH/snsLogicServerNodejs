'use strict'
var bodyParser = require('body-parser');
const Node = require('./unit/node');
const Edge = require('./unit/edge');

module.exports = (function(){
    class Graph {
        constructor(){
            this.nodeIndex = new Set();
            this._edges = [];
            this._nodes = [];
        }

        createNode(type, index){
            if(this.nodeIndex.has(index)){
                console.error("Index collision: index already exist in node list", type)
                return false
            }
            let node = new Node(type, index);
            this._nodes.push(node);
            this.nodeIndex.add(index);
            return node;
        }

        createEdge(type){
            var edge = new Edge(type);
            this._edges.push(edge);
            return edge;
        }
        getNodes(nodeType){
            var arr = [];
            if(!nodeType)
                return this._nodes;
            else{
                for(let eachNode of this._nodes){
                    if(eachNode.getType().toString() == nodeType.toString()){
                        arr.push(eachNode);
                    }
                }
                return arr;

            }
        }
        getEdges(edgeType){
            var arr = [];
            if(!edgeType)
                return this._edges;
            else{
                for(let eachEdge of this._edges){
                    if(eachEdge.type.toString() === edgeType.toString()){
                        // console.log(eachEdge)
                        arr.push(eachEdge);
                    }
                }
                // console.log(arr,'---------------');
                return arr;
            }
        }

        find(index, nodeType){
            let arr = [];
            // console.log(index,"accepted")
            if(!this.nodeIndex.has(index)) {
                // console.log(index,"and false")
                return false;
            }
            else {
                if(nodeType){
                    this._nodes.forEach(function(eachNode){
                        if(eachNode.type == nodeType)
                            arr.push(eachNode)
                    });
                    for (let node of arr) {
                        if (node.index == index){
                            // console.log(index,"and ", node.index)
                            return node;
                        }
                    }
                }
                else {
                    for (let node of this._nodes) {
                        if (node.index == index){
                            // console.log(index,"and ", node.index)
                            return node;
                        }
                    }
                }
            }
        }

        getMinNodeNotVisit(path, nodeType){
            let min = Infinity;
            let result = null;
            for (var eachPath in path) {
                if(!path[eachPath].visit){
                    if(path[eachPath].dist != Infinity) {
                        if (min > path[eachPath].dist) {
                            min = path[eachPath].dist;
                            result = this.find(eachPath, nodeType);
                        }
                    }
                }
            }
            return result;
        }





    }
    return Graph;
})();



