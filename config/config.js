/**
 * Created by a on 2/8/17.
 */

var config = {};
config.server = {};
config.mongodb = {};
config.redis = {};

config.server.port = process.env.PORT || 3000;//'mongodb://localhost:27017/arture');

//mongoDB configurations
config.mongodb.id = 'sgay';
config.mongodb.password = 'sgay123';

config.mongodb.protocol = 'mongodb://'
// config.mongodb.host = 'localhost'; // local DB
config.mongodb.host = '192.168.1.209'; // remote DB
// config.mongodb.host = '192.168.1.208'; // remote DB
config.mongodb.port = 27017;
config.mongodb.db = 'test';
config.mongodb.url = config.mongodb.protocol+ config.mongodb.host+':'+ config.mongodb.port +'/'+config.mongodb.db



//redis configurations // 
// config.redis.host = 'localhost'; // local redis
config.redis.host = '192.168.1.208'; // remote redis
config.redis.port = 6379;

module.exports = config;