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
                    resolved(arture)
                })
            }).then(function(result){

            })

        });

}

exports.setArtureReco = setArtureReco;