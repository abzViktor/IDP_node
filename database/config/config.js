require('dotenv').config();

const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

module.exports = {
    url: 'postgres://syxkusnzeijxzx:e36e2656851a3e3f8a81a2b51fed04a5c788aaeb54d9c7c81519820e9742c242@ec2-52-44-31-100.compute-1.amazonaws.com:5432/d2mglhlrgao50h',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
}
