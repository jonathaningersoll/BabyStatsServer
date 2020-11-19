const { DataTypes } = require('sequelize');            // get DataTypes from sequelize
const db = require('../db');                           // get an instance of ../db as "db"

const User = db.define('user', {
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},

	passwordhash: {
		type: DataTypes.STRING,
		allowNull: false
	},

	email: {
		type: DataTypes.STRING,
		allowNull: false
	},

	role: {
		type: DataTypes.STRING,
		allowNull: false
	}
});

module.exports = User;