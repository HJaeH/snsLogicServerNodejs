/**
 * Created by a on 1/13/17.
 */
var express = require('express');

var app = express();

var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


////////// Redis
// var redis = require('redis');
/*var redisClient = redis.createClient(6379,'192.168.1.208');
redisClient.on('connect', function() { // port 6379
    console.log('connected');
});*/


/// Mongo DB
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://192.168.1.208:27017/arture');


// DEFINE MODEL


// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// [CONFIGURE ROUTER]
var router = require('./routes')
router(app);

// [RUN SERVER]
var server = app.listen(port, function(){
    console.log("Express server has started on port " + port)
});
