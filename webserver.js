/*!
 * Web Server
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var express = require('express');

var app = express();

app.configure(function(){
    
    //The order of which middleware are "defined" using app.use() is very important, 
    // they are invoked sequentially, thus this defines middleware precedence.
    
    app.use(express.logger({ format: 'dev' }));
        
    app.use(express.cookieParser());
    app.use(express.bodyParser({ keepExtensions: true, uploadDir: './files' }));
    app.use(express.methodOverride());    
    app.use(express.compress());
    app.use(express.responseTime());
    
    //Handle favicon
    app.use(express.favicon());
    
    //Handlebar templates
    //More @ https://github.com/donpark/hbs
    app.set('views', __dirname + '/views');        
    app.set('view engine', 'hbs');
    
    //Generic server error handling
    app.use(express.errorHandler({
        dumpExceptions: true, 
        showStack: true
    }));
    
    //Log Errors
    app.use(function (err, req, res, next) {        
        console.error(err.stack);
        next(err);
    });
    
});

//REGISTER ROUTERS

// "app.router" positions our routes 
// above the middleware defined below,
// this means that Express will attempt
// to match & call routes _before_ continuing
// on, at which point we assume it's a 404 because
// no route has handled the request.

app.use(app.router);


//Static files can be served with express' static middleware. 
//I usually make a directory for all static files to be served from the "public" folder.
app.use('/public', express.static(__dirname + '/public', { maxAge: 86400000 /*one-day*/ }));


//MIDDLEWARE

// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.

// $ curl http://localhost:8080/notfound
// $ curl http://localhost:8080/notfound -H "Accept: application/json"
// $ curl http://localhost:8080/notfound -H "Accept: text/plain"

app.use(function(req, res, next){
  
  res.status(404);
  
  // respond with html page
  if (req.accepts('html')) {
    res.render('error/404.hbs', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
    
});

// error-handling middleware, take the same form
// as regular middleware, however they require an
// arity of 4, aka the signature (err, req, res, next).
// when connect has an error, it will invoke ONLY error-handling
// middleware.

// If we were to next() here any remaining non-error-handling
// middleware would then be executed, or if we next(err) to
// continue passing the error, only error-handling middleware
// would remain being executed, however here
// we simply respond with an error page.

app.use(function(err, req, res, next){
  // we may use properties of the error object
  // here and next(err) appropriately, or if
  // we possibly recovered from the error, simply next().
  res.status(err.status || 500);
  res.render('error/500.hbs', { error: err });
});

//ROUTES
require("./routes/common.js")(app); 

//PROCESS
require('./lib/process.js')(process);


//Kick-Start the server
app.listen(8080);
console.log('Server running at http://localhost:8080/');