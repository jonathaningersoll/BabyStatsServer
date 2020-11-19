const { DataTypes } = require('sequelize');            // get DataTypes from sequelize
const db = require('../db');                           // get an instance of ../db as "db"

const DiaperLog = db.define('diaperlog', {
     
     time_checked: {
          type: DataTypes.DATE,
          allowNull: false
     },

     dirty: {
		type: DataTypes.BOOLEAN
     },

     wet: {
          type: DataTypes.BOOLEAN
     },
     
     dry: {
          type: DataTypes.BOOLEAN
     }

});

module.exports = DiaperLog;