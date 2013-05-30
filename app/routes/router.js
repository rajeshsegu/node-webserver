var auth = require("../authenticate"),
    account = require("account");

// Export routes
module.exports = function(a, p) {

    a.post("/account/login", account.login);
    a.get("/account/logout", account.logout);
    a.get("/account/register", account.register);           
    a.get('/account/registered', account.getRegistered);    
    
    
    
    
    
    return;
    
    // Main routes
    a.get('/', main.getHome);
    a.get('/about', main.getAbout);
    a.get('/contact', main.getContact);
    
    // Modal routes
    a.get('/modals/register', account.getRegisterModal);
    a.get('/modals/login', account.getLoginModal);
    a.get('/modals/terms', main.getTermsModal)
    
    // Account routes
    a.get('/account/home', auth.ensureAuthenticated, account.getAccount);
    a.post('/account/register', account.postRegister);
    a.get('/account/logout', account.getLogout);
    a.get('/account/registered', account.getRegistered)
    
    // Passport login function
    a.post('/account/login', function(req, res, next) {
        p.authenticate('local', function(err, user, info) {
            if (err){return next(err);} 
            if (!user) { return res.send({st:"fail"})} 
            req.logIn(user, function(err) { 
                if (err) { return next(err); } 
                return res.redirect('/');
            });
        })(req, res, next);
    });
    
    // Category
    a.get('/category/:seo', category.getBySEO);
    
    // Product
    a.get('/product/:seo', product.getBySEO);
    
    // Cart
    a.post('/cart/add/:id', cart.addProduct);
    a.post('/cart/rem/:id', cart.remProduct);
    
    // Checkout
    a.get('/checkout/cart', checkout.getCart)
    a.get('/checkout/guest', checkout.getGuest)
    a.post('/checkout/guest', checkout.postGuest)
    
};