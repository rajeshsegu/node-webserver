var fs = require("fs");

/**
 * Get filename from a given path.
 *
 * @param String handle
 * @return String
 */
function getFileName(handle) {
	var segments = handle.split('/');
	return segments[segments.length-1];
}

function readFile(filePath){
    return fs.readFileSync(filePath, 'uts8');
}