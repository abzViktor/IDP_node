const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/models');
const Statistics = require('../database/models/statistics.js')
const stat = Statistics(sequelize, DataTypes);

module.exports = {
  setStatsToDatabase: async (stats) => {
    console.log("Fired");
    try {
      const newStat = await stat.build({ date: Date.now(), stat: stats });
      await newStat.save();
    } catch (e) {
      console.log(e)
    }
  }
}



// const checkConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }
//
// checkConnection();
