module.exports = function(app) {
    
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

};


    