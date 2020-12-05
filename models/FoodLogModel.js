const { DataTypes } = require('sequelize');            // get DataTypes from sequelize
const db = require('../db');                           // get an instance of ../db as "db"

const FoodLog = db.define('foodlog', {
     
     time_fed: {
          type: DataTypes.DATE,
          allowNull: false
     },

     breast: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	bottle: {
		type: DataTypes.INTEGER,
	},

	solid: {
		type: DataTypes.STRING,
	}

});

module.exports = FoodLog;

// TODO: Bottle must be {allownull: true}