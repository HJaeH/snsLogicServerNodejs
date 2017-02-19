'use strict'

module.exports = (function(){
    class Node{
        constructor(index){
            this.index = index;
            this.next = null;
        }
    }
    class Queue{
        constructor(){
            // this.node = null;
            this.first = null;
            this.size = 0;
        }
        enqueue(data){
            var node = new Node(data);
            node.visit = true;
            // console.log('data enqueue',data);
            var n = null;
            if (!this.first){
                this.first = node;
                console.log('first node', this.first);
            } else {
                n = this.first;
                while (n.next) {
                    n = n.next;
                }
                n.next = node;
            }

            this.size += 1;
            return node;
        };


        dequeue(){
            var temp = this.first;
            // console.log(temp)//null
            this.first = this.first.next;
            this.size -= 1;
            return temp;
        };



    };
    return Queue;
})();