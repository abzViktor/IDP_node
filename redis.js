const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

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
  }
}

