
module.exports = function(app, graph)
{
    var ControllerHandler = require('../controllers/controller.handler');
    //set all response headers
    app.get('/*',function(req, res, next){
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });

    // set friend recommendation list into redis
    app.post('/api/v1/users/:user_id/friends', function(req, res){ // from django
        ControllerHandler.setFriendReco(req.params.user_id, graph, function (err) { // todo: apply mmodel handler
            if(err)
                console.error("Fails to create recommendation list");
        });
        res.send("Friends recommendation list updated");
    });

    //get friend recommendation list of each user
    app.get('/api/v1/users/:user_id/friends', function(req, res){

        ControllerHandler.getFriendReco( req.params.user_id , req.query.cnt).then(function(result){
            res.send(result);
        });
    });
    // set newsfeed into redis
    app.post('/api/v1/users/:user_id/newsfeed', function(req, res){
        // ControllerHandler.setNewsfeed(User, req.params.user_id);
        ControllerHandler.setNewsfeed(req.params.user_id);
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
  /*  app.post('/api/v1/users/:user_id/artures', function(req, res){
        // ControllerHandler.setArtureGraph();
        ControllerHandler.createGraph();
        res.send("arture recommendation ");
    });*/

    app.get('/api/v1/users/:user_id/sign_up', function(req, res){
        graph.createNode('artureNode', req.params.user_id);
        console.log(graph);
        res.send('Signed up user add to graph');
    });
    // follow relation add to graph
    app.get('/api/v1/users/:user_id/follow/:arture_id', function(req, res){
        ControllerHandler.graphAddFollow(graph, req.params.user_id, req.params.arture_id);
        res.send("Graph updated");
    });

    // arture recommendation
    app.get('/api/v1/users/:user_id/arture_reco', function(req, res){
        // ControllerHandler.createGraph(graph); // create initial graph based on mongo
        ControllerHandler.getArtureRecommendation(req.params.user_id, graph, function(){
        }).then(function(result){
            res.send(result);
        })
    });


}
// todo: 친구관계 갱신 시 요청 받는거