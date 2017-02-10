"use strict"; // todo: add config file port, db pw ~~ & redis, db 등 관리, 경로에서 ./ 필요한지, conne
                // todo : redis fail시 해결 코드
delete process.env["DEBUG_FD"]; //for `DEBUG_FD` is deprecated. Override `debug.log` error
var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Redis = require('redis');
var config = require('./config');
var router = require('./routes');
var debug = require('debug')('app');
var app = express();

//redis promisfy
module.exports.RedisClient = Promise.promisifyAll(Redis.createClient(config.redis.port, config.redis.host));// todo : 패키지 메소드 문제 해결




// Mongo DB
mongoose.connect(config.mongodb.host+':'+ config.mongodb.port +'/'+config.mongodb.db);
// var db = mongoose.connection;


// configure app to use body body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// router configure
router(app);

// run server
var port = config.server.port;
var server = app.listen(port, function(){
    console.log("Express server has started on port " + port);
});

//Todo db update시에 아티클 reg_time도 같이 업데이트 하도록

