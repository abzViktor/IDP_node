const { DataTypes } = require('sequelize');
const sequelize = require('../database/config/config').production;
const Statistics = require('../database/models/statistics.js');
const stat = Statistics(sequelize, DataTypes);

module.exports = {
  setStatsToDatabase: async (stats) => {
    try {
      const newStat = await stat.build({ date: Date.now(), stat: stats });
      await newStat.save();
    } catch (e) {
      console.log(e)
    }
  }
}

