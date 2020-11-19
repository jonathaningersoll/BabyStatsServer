const express = require('express');						// then -> get express functionality as "express"
const foodLogController = express.Router();					// then -> get the express.Router() functionality as "userController"
const { FoodLog } = require('../models/index');				// then -> go to the models index to get the user model as "User"

foodLogController.get('/test', (req, res) => {
	res.send('welcome to the food log controller');
})

/**************************************************
/	Create a food log				- POST	*/
foodLogController.post('/', (req, res) => {
	var newLog = req.body.foodlog;
	console.log(newLog);
	FoodLog.create({
		time_fed: newLog.time_fed,
		breast: newLog.breast,
		bottle: newLog.bottle,
		solid: newLog.solid,
		childId: newLog.childId,
	}).then(
		function createSuccess(logData) {
			res.json({
				foodlog: logData
			});
		},
		function createError(err) {
			res.send(500, err.message);
		}
	)
})

/**************************************************
/	Get a food log by ID			- GET	*/
foodLogController.get('/:id', (req, res) => {
	FoodLog.findOne({
		where: {
			id: req.params.id
		}
	}).then(
		function findOneSuccess(data){
			res.json(data);
		},
		function findOneError(err){
			res.send(500, err.message);
		}
	);
});

/**************************************************
/	Update a food log by ID			- PUT	*/
foodLogController.put('/:id', (req, res) => {
	var newLog = req.body.foodlog;
	FoodLog.update(
		{
				time_fed:	newLog.time_fed,
				breast:	newLog.breast,
				bottle:	newLog.bottle,
				solid:	newLog.solid,
				childId:	newLog.childId,
		},
		{
			where: {
				id:		req.params.id,
				childId:	newLog.childid,
			}
		}
	).then(
		function updateSuccess(logData){
			res.json({
				time_fed:	newLog.time_fed,
				breast:	newLog.breast,
				bottle:	newLog.bottle,
				solid:	newLog.solid,
				childId:	newLog.childId,
			})
		},
		function updateError(err){
			res.send(500, err.message);
		}
	);
})

/**************************************************
/	Delete a food log by ID			- DELETE	*/
foodLogController.delete('/:id', (req, res) => {
	FoodLog.destroy(
		{
			where: {
				id:		req.params.id,
			}
		}
	).then(
          function deleteLogSuccess(){
               res.send("Food log successfully deleted.");
          },
          function deleteLogError(err){
               res.send(500, err.message);
          }
     )
})

module.exports = foodLogController;