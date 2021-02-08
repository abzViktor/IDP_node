import UAParser from 'ua-parser-js';
import express from 'express';
import cors from 'cors';
import {getFromRedis, setToRedis} from "./redis.js";

const app = express();

app.use(cors());

app.get('/version', (req, res) => {
  res.send(JSON.stringify({version: process.version}));
});

app.post('/user', (req, res) => {
  const parser = new UAParser();
  const ua = req.headers['user-agent'];
  const browserName = parser.setUA(ua).getBrowser().name;
  const uid = req.query.uid;
  console.log(uid);

  setToRedis(uid, JSON.stringify({browser: browserName})).then(() => {
    res.send(JSON.stringify({success: true, browser: browserName}));
  }).catch((err) => {
    res.send(JSON.stringify({success: false, error: err}))
  })
});

app.get('/user', (req, res) => {
  const uid = req.query.uid;

  getFromRedis(uid).then((data) => {
    res.send(JSON.stringify({success: true, browser: JSON.parse(data).browser}));
  })
});

app.listen(+process.env.PORT || 5000, () => {
  console.log("Server started");
});




