/**
 * Created by a on 2/8/17.
 */
var RedisClient = require('../app').RedisClient;

module.exports.redisEvent = function() {
    RedisClient.on('connect', function () { // port 6379
        console.log("Redis is connected");
    });
    RedisClient.on('ready', function () {
        console.log("Redis is ready");
    });

    RedisClient.on('error', function () {
        console.log("Error in Redis");
    });
}
