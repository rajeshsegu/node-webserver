var utils = require("utils"),
    extend = utils.extend;

function Client(settings){
    
    extend( this, settings );
    
    this.server = extend({
		host: "api.myserver.com",
		port: 80
	}, this.server || {});
    
};

extend(Client.prototype, {
    
    request: function( options, data, fn ) {
		
        if ( typeof data === "function" ) {
			fn = data;
			data = null;
		}
		
        fn = fn || utils.noop;

		var req = http.request( extend({
			host: this.server.host,
			port: this.server.port,
			method: "GET",
			headers: {
				authorization: this.authHeader,
				"user-agent": util.getUA(),
				"content-length": typeof data === "string" ? data.length : 0
			}
		}, options ), function( res ) {
			var response = "";
			res.setEncoding( "utf8" );
			res.on( "data", function( chunk ) {
				response += chunk;
			});
			res.on( "end", function() {
				if ( res.statusCode !== 200 ) {
					var message;
					if ( res.headers[ "content-type" ].indexOf( "json" ) !== -1 ) {
						message = JSON.parse( response ).message;
					} else {
						message = response;
					}
					if ( !message && res.statusCode === 403 ) {
						message = "Forbidden";
					}
					fn( new Error( message ) );
				} else {
					fn( null, JSON.parse( response ) );
				}
			});
		});

		if ( data ) {
			req.write( data );
		}
        if(req.end){
		  req.end();
        }else{
          req.close();
        }
        
	}
});

module.exports = {
    createClient:   function(settings){
        return new Client(settings);
    }
}