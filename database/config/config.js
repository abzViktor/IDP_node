require('dotenv').config();

const DB_URL = process.env.DATABASE_URL;
console.log("DB_URL");
console.log(DB_URL);
module.exports = {
  // development: {
  //   host: "localhost",
  //   dialect: 'postgres',
  //   database: 'postgres'
  // },
  // production: {
    url: DB_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  // }
}
