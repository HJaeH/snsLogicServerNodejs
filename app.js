"use strict"; // todo: add config file port, db pw ~~ & redis, db 등 관리, 경로에서 ./ 필요한지, conne
                // todo : redis fail시 해결 코드
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var Redis = require('redis');
var config = require('./config');
var router = require('./routes');

var RedisClient = Promise.promisifyAll(Redis.createClient(6379,'localhost')); // todo : 패키지 메소드 문제 해결
var app = express();


var port = config.server.port;

RedisClient.on('connect', function() { // port 6379
    console.log("Redis is connected");
});
RedisClient.on('ready',function() {
    console.log("Redis is ready");
});

RedisClient.on('error',function() {
    console.log("Error in Redis");
});

// Mongo DB
var db = mongoose.connection;
mongoose.connect('mongodb://192.168.1.208:27017/arture');
// mongoose.connect('mongodb://localhost:27017/arture');

// configure app to use body body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// router configure
router(app, RedisClient);

// run server
var server = app.listen(port, function(){
    console.log("Express server has started on port " + port)
});

exports.RedisClient = RedisClient;

