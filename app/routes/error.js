module.exports = function(app) {
    
    //Error Routes    
    
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

};