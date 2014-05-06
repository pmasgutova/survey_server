console.log("server is starting...");

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers")

server.start(router.routeGet, router.routePost, requestHandlers.handle);