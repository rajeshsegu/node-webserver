var CommonRouters = function(app) {
    //Error Routes
    
app.get("/", function(req, res, next){
    res.redirect(301, '/public/index.html');
});    
    
//Multipart upload REST end-point
app.post("/upload", function(req, res, next){
    if(req.files){
        console.log(JSON.stringify(req.files));
    }
    res.status(200);
    res.end(JSON.stringify(req.files));    
});     

app.get('/404', function(req, res, next){
  // trigger a 404 since no other middleware
  // will match /404 after this one, and we're not
  // responding here
  next();
});

app.get('/403', function(req, res, next){
  // trigger a 403 error
  var err = new Error('not allowed!');
  err.status = 403;
  next(err);
});

app.get('/500', function(req, res, next){
  // trigger a generic (500) error
  next(new Error('keyboard cat!'));
});   

}

module.exports = function(app){
    return new CommonRouters(app);
}