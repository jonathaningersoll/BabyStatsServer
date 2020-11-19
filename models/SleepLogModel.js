const { DataTypes } = require('sequelize');            // get DataTypes from sequelize
const db = require('../db');                           // get an instance of ../db as "db"

const SleepLog = db.define('sleeplog', {
     
     sleep_start: {
          type: DataTypes.DATE,
          allowNull: false
     },

     sleep_stop: {
		type: DataTypes.DATE,
		allowNull: false,
     },
     
});

module.exports = SleepLog;