// Create web server
// Start the server with: node comments.js
// Then open in browser: http://localhost:8080
// To stop the server: Ctrl+C

// Load the http module to create an http server.
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    //console.log(request.url);
    var pathname = url.parse(request.url).pathname;
    //console.log(pathname);
    var query = url.parse(request.url).query;
    //console.log(query);
    var querystring = require('querystring');
    var query = querystring.parse(query);
    //console.log(query);
    var filename = "comments.json";
    var file = path.join(__dirname, filename);
    //console.log(file);
    var comments = JSON.parse(fs.readFileSync(file, 'utf8'));
    //console.log(comments);
    var comment = {};
    var commentsArray = [];
    var commentsArray = comments.comments;
    //console.log(commentsArray);
    if (pathname == "/getComments") {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify(comments));
        response.end();
    }
    else if (pathname == "/addComment") {
        comment.name = query.name;
        comment.comment = query.comment;
        comment.date = new Date();
        //console.log(comment);
        commentsArray.push(comment);
        comments.comments = commentsArray;
        //console.log(comments);
        fs.writeFile(file, JSON.stringify(comments), function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("File saved");
                response.writeHead(200, { "Content-Type": "application/json" });
                response.write(JSON.stringify(comments));
                response.end();
            }
        });
    }
    else {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write("Hello World!");
        response.end();
    }
});

// Listen on port 8080, IP defaults to