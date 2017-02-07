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
mongoose.connect('mongodb://localhost:27017/arture');
var Arture = Promise.promisifyAll(require('.././models/arture'));
var Article = Promise.promisifyAll(require('.././models/article'));
var User = Promise.promisifyAll(require('../models/user'));

var ObjectId = mongoose.Types.ObjectId;
var artureNum = 100;


/*



for(var i = 0 ;  i <  artureNum; i++){
    var arture = new Arture();
    arture.title = "Title"+i;
    arture.image = "http://www.the-pr.co.kr/news/photo/201107/art_1311236592.jpg";
    arture.followers = [];
    arture.save(function(err){
        if(err){
            console.error("DB save failed");
        }
    })
}



var followTable = [];


for(var i = 0 ; i< 100; i ++) {
    var arr = [];
    for (var j = 0; j < 100; j++){
        arr.push(false);
    }
    followTable.push(arr);
}


for(var i = 0 ; i< 100; i ++){
    var x = Math.floor(Math.random()*99);
    // console.log(x);
    var y = Math.floor(Math.random()*99);
    if(x != y) {
        // console.log(x+", "+y);
        followTable[x][y] = true;
        followTable[y][x] = true;
    }
}



User.find()
    .then(function(users){
        Promise.map(users, function(eachUser, i){
            // console.log(i)
            Arture.find()
                .then(function(artures){
                    Promise.map(artures, function(eachArture, j){
                        if(followTable[i][j]){
                            User.update({_id: new ObjectId(eachUser._id)}, {$push: { follows: eachArture._id } }, function(){

                            }); // 조회할때는 new obejctId object로 하고 입력할때는 그냥 값
                            Arture.update({_id: new ObjectId(eachArture._id) }, {$push: { followers: eachUser._id } }, function(){

                            })
                        }
                        return new Promise(function(resolved, rejected){
                            resolved();
                        });
                    });
                });
        })
    })


*/



for(var i = 0;  i < 200; i++) {
    Arture.aggregate([
        {
            $sample: {
                size: 2
            }
        }
    ]).then(function (result) {
        if(result[0]._id != result[1]._id) {
            Arture.update({_id: new ObjectId(result[0]._id)}, {$push: {direct_relation: result[1]._id}}, function (a1, b1, c1) {

            });
            Arture.update({_id: new ObjectId(result[1]._id)}, {$push: {direct_relation: result[0]._id}}, function (a1, b1, c1) {

            });
        }


    })
}

