const http = require("http");
const redis = require('redis');
const UAParser = require('ua-parser-js');
const client = redis.createClient();

http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  if(req.url === "/version"){
    res.end(JSON.stringify({version: process.version}));
  }

  if(req.url === '/user') {
    client.on("error", function(error) {
      console.error(error);
    });
  if(req.method === "POST") {
      const parser = new UAParser();
      const ua = req.headers['user-agent'];
      const browserName = parser.setUA(ua).getBrowser().name;
      req.on('error', (err) => {
        console.error(err);
      }).on('data', () => {
        client.set('browser', browserName, (err) => {
          if(err) {
            res.end(JSON.stringify({success: false, browser: err}));
          }
        });
      }).on('end', () => {
        res.end(JSON.stringify({success: true, browser: browserName}));
      });
  }
  if(req.method === "GET") {
      const res = await getFromRedis('browser');
      res.end(JSON.stringify({success: true, browser: res}));
    }
  }
}).listen(+process.env.PORT || 5000);


const getFromRedis = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      if(err) {
        reject(err);
      }
      resolve(reply);
    });
  })
}
