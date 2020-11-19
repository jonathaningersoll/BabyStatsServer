const { DataTypes } = require('sequelize');            // get DataTypes from sequelize
const db = require('../db');                           // get an instance of ../db as "db"

const Child = db.define('child', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},

	dob: {
		type: DataTypes.DATE,
	},

	birth_weight: {
		type: DataTypes.INTEGER,
	},

	birth_length: {
		type: DataTypes.INTEGER,
	}
});

module.exports = Child;