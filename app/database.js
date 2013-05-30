var mongoose = require('mongoose'),
    express = require('express'),
    MongoStore = require('connect-mongo')(express),
    Schema = mongoose.Schema; //Schema.ObjectId;

module.exports = {

    //Open DB connection
    open: function(dbConfig){
        // Here we find an appropriate database to connect to, defaulting to localhost if we don't find one.  
        // 'mongodb://localhost:27017/app';
        var dbURI = ['mongodb://', dbConfig.host, ':', dbConfig.port, "/", dbConfig.db ].join(""); 
        
        // Makes connection asynchronously.  Mongoose will queue up database
        // operations and release them when the connection is complete.
        mongoose.connect(dbURI, function (err, res) {
            if (err) { 
                console.log ('ERROR connecting to: ' + dbURI + '. \n' + err);
            }  else {
                console.log ('Connected to: ' + dbURI);
            }
        });
        
        // Add listener for opened connection
        mongoose.connection.on('open', function() {
            console.log('MongoDB is ready to use');
        });
        
    },
    
    // Close DB connection
    close: function() {
        return mongoose.disconnect();
    },
    
    sessionStore: function(dbConfig){
        return ( new MongoStore(dbConfig) );
    }

}