var db = require("../database"),
    Auth = require("../authenticate"),
    User = require("../schemas/user");

module.exports = {
    
    
    register: function(req, res){
        
        // Save user in database
        User.add(
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
    }
    

};