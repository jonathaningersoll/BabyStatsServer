const { Sequelize } = require('sequelize');									// destructure a portion of sequelize as "Sequelize"
const sequelize = new Sequelize(process.env.DB_URL, {							// then -> create a new instance of Sequelize as "sequelize"
	dialect: "postgres"
});

// Authenticate the connection
sequelize.authenticate().then(											// then -> authenticate the connection
	() => {
		console.log(
			'Connection has been established successfully to babystats.'
		);
	}).catch(
		err => {
			console.error(
				'Unable to connect to the database:', err
			);
		}
	);

module.exports = sequelize;												// then -> export the sequelize instance to be used in app.js.