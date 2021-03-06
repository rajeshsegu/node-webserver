var db = require("../database"),
    Auth = require("../authenticate"),
    User = require("../schemas/user");

module.exports = {
    
    
    register: function(req, res){
        
        // Save user in database
        return User.add(
            {
                fname : req.body['first'],
                lname : req.body['last'],
                email : req.body['email'],
                password : req.body['password']
            },
            function(err,docs) {
                if(err){
                    res.send({ 
                        success:    false,
                        errorMsg:   "Registration Failed",
                        error:      err 
                    });
                }else{
                    res.redirect('/account/registered');
                }
            });        
    },
    
    login: function(req, res, next) {
        return Auth.login(req, res, next);
    },
    
    
    logout: function(req, res, next){    
        return Auth.logout(req, res, next);    
    },
    
    info: function(req, res, next){
        return User.info(req.params.id, function(err, user){
            if(user){                
                res.json(200, JSON.stringify(user));                
            }else{
                res.json(500, { error: err });
            }
        })
    },
    
    edit: function(req, res, next){                        
        
        //Allow edit of first / last name only.
        var userInfoUpdate = {};
        userInfoUpdate["fname"] = req.body['first'];
        userInfoUpdate["lname"] = req.body['last'];

        return User.edit(req.params.id, userInfoUpdate, function (err, user) {
                if (user) {
                    res.json(200, JSON.stringify(user));
                } else {
                    res.json(500, {error: err});
                }
        });
    }
    

};