var finalhandler = require('finalhandler')
var morgan = require('morgan')
const http = require('http');
const fs = require('fs');
const { getCountry, getSortedCountries } = require('./controllers/getRes.cjs');
const { postTest } = require('./controllers/postRes.cjs');

// Setting morgan and  port
var morganLogger = morgan('dev')
const port = 3000;


// Sets server and manage middlewares
const server = http.createServer((req, res) => {
  var done = finalhandler(req, res);

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST'); // Allow OPTIONS, GET, POST methods
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow Content-Type header
  res.setHeader('Access-Control-Allow-Headers', '*'); // Allow Content-Type header
  res.setHeader('Access-Control-Max-Age', '86400'); // Cache preflight response for  24 hours

  morganLogger(req, res, (err) => {

    // handling err
    if (err) {console.log("finalhandler catch: "); return done(err);}


    // Handle preflight request
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    // Handling GET and Handling ROUTES
    if (req.method === 'GET' && req.url === "/countries") return getCountry(req, res); 
    
    if (req.method === 'GET' && req.url === "/sort/countries") return getSortedCountries(req, res); 
    
    if (req.method === "GET" && req.url === "/test") {
      fs.readFile('./api/data/test.json', "utf-8", (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ error: "Internal - fs server - API Server Error" }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(data);
        }
      });
      return;
    }

    if (req.method === "GET" && req.url === "/base") {
      fs.readFile('./api/data/base.json', "utf-8", (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ error: "Internal - fs server - API Server Error" }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(data);
        }
      });
      return;
    }

    if (req.method === "GET" && req.url === "/log") {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(JSON.stringify(req.headers));
      res.end("\n\r\tlog request completed!");
      return;
    }

    // Handling POST and Handling ROUTES
    if (req.method === 'POST' && req.url === "/test") return postTest(req, res);
    
    // Handle other methods
    res.writeHead(405);
    res.end(`${req.method} is not allowed for the request. (basically, past trough routes handlers)`);
    
  })
});

// Calls server and listens port
server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`Server running at http://localhost:${port}/`);
});

