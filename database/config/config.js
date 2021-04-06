require('dotenv').config();

const DB_URL = process.env.DATABASE_URL;
console.log(DB_URL);
module.exports = {
    url: DB_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
}
