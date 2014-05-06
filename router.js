function error404(response, pathname) {
	console.log("No request handler found for " + pathname);
	response.writeHead(404, {"Content-Type": "text/plain"});
	response.write("404 Not found");
	response.end();
}

function routeGet(handle, pathname, request, response) {
	console.log("About to route a GET request for " + pathname);
	if (typeof handle[pathname+'_get'] === 'function') {
		handle[pathname+'_get'](request, response);
	} else {
		error404(response, pathname);
	}
}

function routePost(handle, pathname, request, response, postData) {
	console.log("About to route a POST request for " + pathname);
	if (typeof handle[pathname+'_post'] === 'function') {
		handle[pathname+'_post'](request, response, postData);
	} else {
		error404(response, pathname);
	}
}

exports.routeGet = routeGet;
exports.routePost = routePost;