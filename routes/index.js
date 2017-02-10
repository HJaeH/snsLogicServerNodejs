module.exports = function(app)
{
    var User = require( '../models/user');
    var Article = require('../models/article');
    var Arture = require('../models/arture');
    var ControllerHandler = require('../controllers/controller.handler');

    //set all response headers
    app.get('/*',function(req,res,next){
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });

    // set friend list into redis
    app.post('/api/v1/users/:user_id/friends', function(req, res){ // from django
        ControllerHandler.setFriendReco(User, function (err) {
            if(err)
                console.error("Fails to create recommendation list");
        });
        res.send("Friends recommendation list updated");
    });

    //get friend recommendation list of each user
    app.get('/api/v1/users/:user_id/friends', function(req, res){
        ControllerHandler.getFriendReco( req.params.user_id).then(function(result){
            res.send(result);
        });
    });

    // set newsfeed into redis
    app.post('/api/v1/users/:user_id/newsfeed', function(req, res){
        ControllerHandler.setNewsfeed(User, req.params.user_id);
        res.send("user newsfeeds list updated");
    });

    //get newsfeed of a user
    app.get('/api/v1/users/:user_id/newsfeed', function(req, res){
        ControllerHandler.getNewsfeed(req.params.user_id)
            .then(function(result){
                res.send(result);
            })
    });

    // set Arture recommendation
    app.post('/api/v1/users/:user_id/artures', function(req, res){
        ControllerHandler.setArtureReco(Arture);
        res.send("arture recommendation ");
    });
}
