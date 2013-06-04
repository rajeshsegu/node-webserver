var Auth = require("../authenticate"),
    account = require("./account");

// Export routes
module.exports = function(a, p) {

    a.post("/account/register", account.register);
    a.post("/account/login",    account.login);
    a.get("/account/logout",    Auth.ensureAuthenticated, account.logout);    
    a.get("/account/:id/info",  Auth.ensureAuthenticated, account.info);
    a.post("/account/:id/edit", Auth.ensureAuthenticated, account.edit);
    
    //a.get('/account/registered', account.getRegistered);    

}