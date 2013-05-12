/**
 * Create a new object using another object as a prototype 'proto'.
 * If 'addProps' is provided, then all the 'own' properties of 'addProps' are
 * copied onto the new object.
 *
 * @param Object proto
 * @param Object addProps
 * @return Object
 */
function extend(proto, addProps) {
	//console.log('extending proto: '+JSON.stringify(proto));
	var obj = Object.create(proto);
	if (addProps) {
		for (var p in addProps) {
			if (addProps.hasOwnProperty(p)) {
				obj[p] = addProps[p];
			}
		}
	}
	return obj;
}

/**
 * Create a no operation function 
 */
function noop(){};


/*
 * eachk :: ([a], (a, Continuation<Void>) -> Void, Coninuation<Void>) -> Void
 * This is a 'foreach' on an array, where the function that needs to be called on the
 * elements of the array is callback style. I.e. the function calls some other function when its
 * work is done. 
 * @param Array array
 * @param Function f
 * @param Function callback 
 */
function eachk(array, f, callback) {
	function loop(i) {
		if (i < array.length) {
			f(array[i], function() {
				loop(i + 1);
			});
		} else {
			callback();
		}
	}
	loop(0);
}

/**
 * Log a given function 
 *
 * @param Function f
 * @return Function
 */
function logit(f) {
	return function () {
		console.log('>>> '+f.name + ' ' + JSON.stringify(arguments));
		var r = f.apply(this, arguments);
		console.log('<<< '+f.name + ' ' + JSON.stringify(r));
		return r;
	};
}

function getUA() {
	var os = require( "os" ),
		version = require( "../package.json" ).version;
	return os.platform() + "/" + os.release() + " " +
		"node/" + process.versions.node + " " +
		"node-browserstack/" + version;
}


module.exports = {
	extend: extend,
    noop: noop,
    getUA: getUA
};