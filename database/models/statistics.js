'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Statistics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Statistics.init({
    date: DataTypes.DATE,
    stat: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Statistics',
  });
  return Statistics;
};
