"use strict"; // todo: add config file port, db pw ~~ & redis, db 등 관리, 경로에서 ./ 필요한지, conne
delete process.env["DEBUG_FD"]; //for `DEBUG_FD` is deprecated. Override `debug.log` error
var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var config = require('./config/config');
var Redis = require('redis');
module.exports.RedisClient = Promise.promisifyAll(Redis.createClient(config.redis.port, config.redis.host))
var router = require('./routes');
var debug = require('debug')('app');
var Graph = require('./util/graph/graph');
var dijkstra = require('./util/dijkstra/dijkstra');
var ControllerHandler = require('./controllers/controller.handler');


var app = express();
var graph = new Graph();
mongoose.Promise = global.Promise;
ControllerHandler.initRedis();
ControllerHandler.initGraph(graph); // create initial graph based on mongo


//redis promisfy//
var eventConnection = require('./events/redis.event');
eventConnection.redisEvent();


// Mongo DB
// mongoose.connect(config.mongodb.protocol+config.mongodb.id+':'+config.mongodb.password+'@' + config.mongodb.host+':'+ config.mongodb.port +'/'+config.mongodb.db);
// mongoose.connect('mongodb://localhost:27017/arture')
mongoose.connect(config.mongodb.url);

// configure app to use body body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// router configure
router(app, graph);

// run server
var port = config.server.port;
var server = app.listen(port, function(){
    console.log("Express server has started on port " + port);
});

//Todo db update시에 아티클 reg_time도 같이 업데이트 하도록

