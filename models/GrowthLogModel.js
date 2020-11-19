const { DataTypes } = require('sequelize');            // get DataTypes from sequelize
const db = require('../db');                           // get an instance of ../db as "db"

const GrowthLog = db.define('growthlog', {
     
     check_date: {
          type: DataTypes.DATE,
          allowNull: false
     },

     length: {
          type: DataTypes.INTEGER
     },

     weight: {
          type: DataTypes.INTEGER
     }

});

module.exports = GrowthLog;