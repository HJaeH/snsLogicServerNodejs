var ControllerHandler = require('../controllers/controller.handler');

module.exports = function(app, graph)
{
    //set all response headers
    app.get('/*',function(req, res, next){
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });
//todo: 레디스 없이 보내기 친구추천
    // set friend recommendation list into redis // 친구관계 업데이트
    app.post('/api/v1/users/:user_id/friends', function(req, res){ // from django
        console.log("tlqkf")
        ControllerHandler.setFriendReco(req.params.user_id,20,graph, function (err) { // todo: apply mmodel handler
            if(err)
                console.error("Fails to create recommendation list");
        });
        res.send("Friends recommendation list updated");
    });

    //get friend recommendation list of each user
    app.get('/api/v1/users/:user_id/friends?cnt', function(req, res){
        ControllerHandler.getFriendReco( req.params.user_id , req.query.cnt).then(function(result){
            res.send(result);
        });
    });

    // set initial newsfeed into redis
    app.post('/api/v1/users/:user_id/newsfeed', function(req, res){
        ControllerHandler.initNewsfeed(req.params.user_id);
        res.send("user newsfeeds list updated");
    });

    //get newsfeed of a user
    app.get('/api/v1/users/:user_id/newsfeed', function(req, res){
        ControllerHandler.getNewsfeed(req.params.user_id)
            .then(function(result){
                res.send(result);
            })
    });

    //Distribute an article to close users of graph
    app.get('/api/v1/users/:user_id/create_article/:article_id/tag/:tag_id', function(req, res){///:article_id/tag/:tag_id
        ControllerHandler.pushNewsfeedArticle(req.params.user_id, req.params.article_id, req.params.tag_id, graph);
        res.send("Article added to users selectively");
    });

    //add a signed up user to graph
    app.get('/api/v1/users/:user_id/sign_up', function(req, res){
        graph.createNode('artureNode', req.params.user_id);
        res.send('Signed up user add to graph');
    });

    //  add follow relation to graph
    app.get('/api/v1/users/:user_id/follow/:arture_id', function(req, res){
        ControllerHandler.graphAddFollow(graph, req.params.user_id, req.params.arture_id);
        res.send("Graph updated");
    });

    // send arture recommendation of a user
    app.get('/api/v1/users/:user_id/arture_reco', function(req, res){
        ControllerHandler.getArtureRecommendation(req.params.user_id, graph, function(){
        }).then(function(result){
            res.send(result);
        })
    });
}