import UAParser from 'ua-parser-js';
import express from 'express';
import cors from 'cors';
const app = express();
import {getFromRedis, setToRedis} from "./redis.js";

app.use(cors());

app.get('/version', (req, res) => {
  res.send(JSON.stringify({version: process.version}));
});

app.post('/user', (req, res) => {
  const parser = new UAParser();
  const ua = req.headers['user-agent'];
  const browserName = parser.setUA(ua).getBrowser().name;

  setToRedis('browser', browserName).then(() => {
    res.send(JSON.stringify({success: true, browser: browserName}));
  }).catch((err) => {
    res.send(JSON.stringify({success: false, error: err}))
  })
});

app.get('/user', (req, res) => {
  getFromRedis('browser').then((data) => {
    res.send(JSON.stringify({success: true, browser: data.toString()}));
  })
});

app.listen(+process.env.PORT || 5000, () => {
  console.log("Server started");
});




