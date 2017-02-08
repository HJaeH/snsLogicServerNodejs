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
                console.log("arture");
            })
        });

}




exports.setArtureReco = setArtureReco;