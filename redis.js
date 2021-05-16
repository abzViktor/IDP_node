const redis = require('redis');
const redisScan = require('node-redis-scan');
const client = redis.createClient(process.env.REDIS_URL);
const scanner = new redisScan(client);

module.exports = {
  setToRedis: (key, value) => {
    return new Promise((resolve, reject) => {
      client.set(key, value, (err, reply) => {
        if(err) {
          reject(err);
        }
        resolve();
      })
    })
  },
  getFromRedis: (key) => {
    return new Promise((resolve, reject) => {
      client.get(key, (err, reply) => {
        if(err) {
          reject();
        }
        resolve(reply);
      })
    })
  },
  scanKeys: (pattern) => {
    return new Promise((resolve, reject) => {
      scanner.scan(pattern, (err, reply) => {
        if(err) {
          reject();
        }
        resolve(reply);
      })
    })
  }
}

