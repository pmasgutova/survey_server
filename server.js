var http = require("http");
var url = require("url");
var port = process.env.PORT || 8888;
var connect = require("connect");

function start(routeGet, routePost, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    console.log(request.method);
    if(request.method == "GET") {
      routeGet(handle, pathname, request, response);
    } else if(request.method == "POST") {
      console.log("hello from post 1");
      var postData = "";
      request.on('data', function(data) {
            postData += data;
            if(postData.length > 1e6) {
                postData = "";
                response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                request.connection.destroy();
            }
        });

      request.on('end', function() {
          console.log(postData);
          routePost(handle,pathname,request,response,postData);
      });
    }
  }

  var app = connect()
    .use(connect.static("public_files"))
    .use(onRequest)
    .listen(port);

  console.log("Server has started.");
}

exports.start = start;