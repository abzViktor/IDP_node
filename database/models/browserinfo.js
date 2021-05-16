'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BrowserInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  BrowserInfo.init({
    uid: DataTypes.STRING,
    browser: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BrowserInfo',
  });
  return BrowserInfo;
};
