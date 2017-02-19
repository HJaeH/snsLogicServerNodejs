/**
 * Created by a on 2/1/17.
 */


var ug = require('ug');
var Graph = new ug.Graph();
var Promise = require('bluebird');
Graph.createNode('Node');


var setArtureReco = function(Arture){
    Arture.find()
        .then(function(artures){
            Promise.map(artures, function(arture, index) {
                Graph.createNode('node', {id : arture._id.toString()});
                return new Promise(function(resolved, rejected){
                    resolved(arture);
                })
            }).then(function(result){
                console.log(result);
            })

        });

}
exports.setArtureReco = setArtureReco;


/* // graph 부분 잠시 저장

Arture.find().then(function(artures){
    Promise.map(artures, function(arture) {
        graph.createNode('artureNode', {id : arture._id.toString()}); // create node by id
        console.log(graph.nodes('artureNode').find(arture._id));
        return new Promise(function(resolved, rejected){
            resolved(arture)
        })
    }).map(function(arture) {
        Promise.map(arture.direct_relation, function(eachDirectRelation){
            graph.createEdge('edge').link(
                graph.nodes('artureNode').find(arture._id.toString()),
                graph.nodes('artureNode').find(eachDirectRelation.toString())
            ).setDistance(1);

            return new Promise(function(resolved, rejected){ // return empty promise object  just to control the async flow
                resolved()
            })
        })
    }).then(function(){
        console.log('Closest:');
        graph.closest(graph.nodes('artureNode').find(artures[1]._id)).map(function(v) {
            if(v.distance() !== 0 ) // except for itself
                console.log(v.distance(), v.end().toString());
        });
        console.log(artures[1]);
    })
}).then(function(){
    User
});*/
