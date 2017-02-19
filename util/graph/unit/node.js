module.exports = (function(){
    'use strict';

    class Node {
        constructor(type, index){
            this.index = index;
            this.type = type;
            this.edges = [];

        }
        getEdges(edgeType){
            var arr = [];
            if(!edgeType)
                return this.edges;
            else{
                for(let eachEdge of this.edges){
                    if(eachEdge.type.toString() === edgeType.toString()){
                        arr.push(eachEdge);
                    }
                }
                return arr;
            }
        }

        getType(){
            return this.type;
        }
        addEdge(edge){
            this.edges.push(edge);
            return this;
        }

        edgeCount(){
            return this.edges.length;
        }

        edgeTypeof(type){
            let edgeTypeof = [];
        }

        getIndex(){
            return this.index;
        }


        edgeExist(otherNode){
                for(let eachEdge of this.edges){
                    // console.log(eachEdge.firstNode.getIndex(),eachEdge.secondNode.getIndex() ,otherNode.getIndex());
                    if(eachEdge.firstNode.getIndex() == otherNode.getIndex() || eachEdge.secondNode.getIndex() == otherNode.getIndex())
                        return true;
                }

                return false;
        }

        getAdjacentNodes(){
            var arr = [];
            this.getEdges('artureEdge').forEach(function (eachArtureEdge) {
                let firstNeighbor = eachArtureEdge.firstNode.index;
                let secondNeighbor = eachArtureEdge.secondNode.index;
                if (firstNeighbor != this.index) {
                    arr.push(firstNeighbor);
                }
                else if (secondNeighbor != this.index) {
                    arr.push(secondNeighbor);
                }
            });
            return arr;
        }



    }
    return Node;
})()
