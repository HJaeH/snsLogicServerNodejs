var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Promise = require('bluebird');
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

// mongoose.connect('mongodb://192.168.1.208:27017/arture');
// mongoose.Promise = global.Promise;
// mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/arture');
var Article = Promise.promisifyAll(require('.././models/article'));
var User = Promise.promisifyAll(require('.././models/user'));
var ObjectId = mongoose.Types.ObjectId;
var cnt = 0;
var i, j, k;





/*

for(i = 0; i< 100; i++) {
    var friendList = [];
    /!*for (var j = 0; j < 100; j++) {
     if(friendsTable[i][j]){

     friendList.push("user"+j);
     }
     }*!/


    var user = new User();
    user.user_id = "user" + i;
    user.name = "name" + i;
    user.password = "password"
    // user.friends = friendList;
    user.friends = [];
    user.gender = true;
    user.age = 25;
    user.article_list = [];
    user.follows = [];

    cnt++;
    user.save(function(err){
        if(err){
            console.error(err);
            return;
        }
    });
}

*/


var friendsTable = [];


for(var i = 0 ; i< 100; i ++) {
    var arr = [];
    for (var j = 0; j < 100; j++){
        arr.push(false);
    }
    friendsTable.push(arr);
}


for(var i = 0 ; i< 100; i ++){
    var x = Math.floor(Math.random()*99);
    // console.log(x);
    var y = Math.floor(Math.random()*99);
    if(x != y) {
        // console.log(x+", "+y);
        friendsTable[x][y] = true;
        friendsTable[y][x] = true;
    }
}


for(var i = 0;  i < 200; i++) {
    User.aggregate([
        {
            $sample: {
                size: 2
            }
        }
    ]).then(function (result) {
        if(result[0]._id != result[1]._id) {
            User.update({_id: new ObjectId(result[0]._id)}, {$push: {friends: result[1]._id}}, function (a1, b1, c1) {
                // console.log(randomUser._id);
            });
            User.update({_id: new ObjectId(result[1]._id)}, {$push: {friends: result[0]._id}}, function (a1, b1, c1) {
                // console.log(randomUser._id);
            });
        }
       

    })
}

