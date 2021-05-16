const {scanKeys, getFromRedis} = require('../redis.js');
const {setToDatabase} = require('./db_connect');
const getStatsFromRedis = () => {
  return new Promise((resolve, reject) => {
    scanKeys('*').then(async keys => {
      for(let i = 0; i <= keys.length - 1; i++) {
        await getKey(keys[i]);
      }
    });
  });
}

const exportStats = async () => {
  const data = await getStatsFromRedis();
  console.log(data);
}

const getKey = async (key) => {
  const stat = await getFromRedis(key);
  console.log(key);
  await setToDatabase(key, JSON.parse(stat).browser);
}

exportStats();
