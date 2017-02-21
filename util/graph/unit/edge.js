
module.exports = (function() {
    'use strict';
    class Edge{

        constructor(type) {
            this.type = type;
            this.distance = 1;// default
            this.directRelation = false;
            this.shareUserNum = 0;
            this.firstNode = null;
            this.secondNode = null;
            // this.followSum = 0;
        }
        setExplicitDistance(dist){
            this.distance = dist;
        }
        setDistance() {
            if(this.directRelation)
                this.distance = 1/(this.shareUserNum+1);//(1/(this.shareUserNum*2));
            else
                this.distance = 2/(this.shareUserNum+1);//(1/(this.shareUserNum));
        }
        getDistance(){
            return this.distance;
        }
        getType(){
            return this.type;
        }

        setProperty(shareNum, direct){
            this.shareUserNum = shareNum;
            this.directRelation = direct;
            this.setDistance();
        }

        link(firstNode, secondNode) {
            if(firstNode.edgeExist(secondNode)){
                // console.log('warning : more than two edges can\'t be added between same nodes')
                return false;
            }
            this.firstNode = firstNode;
            this.secondNode = secondNode;
            firstNode.addEdge(this);
            secondNode.addEdge(this);
            return this;
        }

        incShareUserNum(){
            this.shareUserNum++;
            this.setDistance();
        }
    }

    return Edge;
})();