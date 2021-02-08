import * as redis from 'redis';
const client = redis.createClient(process.env.REDIS_URL);

export const setToRedis = (key, value) => {
  return new Promise((resolve, reject) => {
    client.set(key, value, (err, reply) => {
      if(err) {
        reject();
      }
      resolve();
    })
  })
}

export const getFromRedis = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      if(err) {
        reject();
      }
      resolve(reply);
    })
  })
}
