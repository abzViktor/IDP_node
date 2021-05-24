const {scanKeys, getFromRedis} = require('../redis.js');
const {setStatsToDatabase} = require('./db_connect');

const dailyStat = {
  Chrome: 0,
  Firefox: 0,
  Safari: 0,
  Opera: 0
}

const getStatsFromRedis = () => {
  return new Promise((resolve, reject) => {
    scanKeys('*').then(async keys => {
      for(let i = 0; i <= keys.length - 1; i++) {
        await getKey(keys[i]);
      }
      resolve();
    });
  });
}

const exportStats = async () => {
  await getStatsFromRedis();
  console.log(dailyStat);
  await setStatsToDatabase(JSON.stringify(dailyStat));
}

const getKey = async (key) => {
  const stat = await getFromRedis(key);
  console.log(stat);
  dailyStat[JSON.parse(stat).browser] += 1;
}

exportStats();
