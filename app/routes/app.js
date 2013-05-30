var auth = require("../authenticate"),
    account = require("./account");

// Export routes
module.exports = function(a, p) {

    a.post("/account/login", account.login);
    a.get("/account/logout", account.logout);
    a.post("/account/register", account.register);           
    //a.get('/account/registered', account.getRegistered);    

}