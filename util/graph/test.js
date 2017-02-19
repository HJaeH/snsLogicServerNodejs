/**
 * Created by Jaehwa on 2/14/17.
 */

'use strict'
var Graph = require('./graph');
var graph = new Graph();
var dijkstra = require('././dijkstra');


graph.createNode('node', 'A');
graph.createNode('node', 'B');
graph.createNode('node', 'C');
graph.createNode('node', 'D');
graph.createNode('node', 'E');
graph.createNode('node', 'F');

// console.dir(graph.find('A'));
graph.createEdge('edge').link(graph.find('A'), graph.find('B')).setDistance(7);
graph.createEdge('edge').link(graph.find('A'), graph.find('C')).setDistance(9);
graph.createEdge('edge').link(graph.find('A'), graph.find('F')).setDistance(14);
graph.createEdge('edge').link(graph.find('B'), graph.find('D')).setDistance(15);
graph.createEdge('edge').link(graph.find('B'), graph.find('C')).setDistance(10);
graph.createEdge('edge').link(graph.find('C'), graph.find('D')).setDistance(11);
graph.createEdge('edge').link(graph.find('C'), graph.find('F')).setDistance(2);
graph.createEdge('edge').link(graph.find('D'), graph.find('E')).setDistance(6);
graph.createEdge('edge').link(graph.find('E'), graph.find('F')).setDistance(9);

// graph.createNode('node', 'A');
// graph.createNode('node', 'B');
// console.log(graph.find('A'));
dijkstra(graph, 'A');

// console.log(graph.createEdge('edge').link(graph.createNode('node', 'A'), graph.createNode('node', 'B')));
// console.log(graph.find('A').edgeCount(), '-----------------------------------');
// console.log(graph.createEdge('edge').link(graph.createNode('node', 'A'), graph.createNode('node', 'B')).firstNode);

// console.log(graph.find('A').edgeCount(), '---------------');

// console.dir(graph.find('A'));
// console.dir(graph.find('B'));
// console.dir(graph.find('V'));
// console.log(graph.createEdge('edge'));


/*

class A{
    constructor(){
        this.item = 3;
    }

    setItem(value){
        this.item = value;
    }
}

var x = new A();
var y = new A();
var z = new A();


var set = new Set();
set.add(x);

set.add(y);


// x.setItem(1);
console.log( set.has(z));
console.log(x.item == y.item.toString());*/
var dist = [];
// dist.id = 30;
// dist.name = 20;
