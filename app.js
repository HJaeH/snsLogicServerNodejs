/**
 * Created by a on 1/13/17.
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var Redis = require('redis');


// var Promise = require('promise');
var redisClient = Promise.promisifyAll(Redis.createClient(6379,'localhost'))
// redisClient.createClient(6379,'192.168.1.208');
var app = express();
var port = process.env.PORT || 3000;
// redis
redisClient.on('connect', function() { // port 6379
    console.log('connected');
    /*redisClient.hgetallAsync('user12').then(function(result){
        console.log(result);
    })*/
});

/// Mongo DB
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

// mongoose.connect('mongodb://192.168.1.208:27017/arture');
mongoose.connect('mongodb://localhost:27017/arture');


// DEFINE MODEL


// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// [CONFIGURE ROUTER]
var router = require('./routes')
router(app, redisClient);

// [RUN SERVER]
var server = app.listen(port, function(){
    console.log("Express server has started on port " + port)
});

