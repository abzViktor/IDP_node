import {getFromRedis, setToRedis} from "./redis.js";
import http from "http";
import url from 'url';
import UAParser from 'ua-parser-js';

http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const query = url.parse(req.url, true).query;
  switch (req.url.split('?')[0]) {
    case '/version':
      res.end(JSON.stringify({version: process.version}));
      break;
    case '/user':
      const uid = query.uid;
      if(req.method === "POST") {
        const parser = new UAParser();
        const ua = req.headers['user-agent'];
        const browserName = parser.setUA(ua).getBrowser().name;
        console.log(uid);
        setToRedis(uid, JSON.stringify({browser: browserName})).then(() => {
          res.end(JSON.stringify({success: true, browser: browserName}));
        }).catch((err) => {
          res.end(JSON.stringify({success: false, error: err}))
        })
      }
      if(req.method === "GET") {
        getFromRedis(uid).then((data) => {
          const browserName = JSON.parse(data).browser;
          res.end(JSON.stringify({success: true, browser: browserName}));
        }).catch((err) => {
          res.end(JSON.stringify({success: false, error: err}));
        })
      }
  }
}).listen(+process.env.PORT || 5000);
console.log('Node server running on port 3000');


