const express = require('express');									// then -> get express functionality as "express"
const growthLogController = express.Router();					// then -> get the express.Router() functionality as "diaperLogController"
const { GrowthLog } = require('../models/index');				// then -> go to the models index to get the user model as "DiaperLog"

growthLogController.get('/', (req, res) => {
	res.send('welcome to the growth log controller');
})

/**************************************************
/	Create a growth log				- POST	*/
growthLogController.post('/', (req, res) => {
	var newLog = req.body.growthlog;
	GrowthLog.create({
		check_date:	newLog.check_date,
		length:		newLog.length,
		weight:		newLog.weight,
		childId:		newLog.childId
	}).then(
		function createSuccess(logData) {
			res.json({
				growth: logData
			});
		},
		function createError(err) {
			res.send(500, err.message);
		}
	)
})

/**************************************************
/	Get a growth log by ID			- GET	*/
growthLogController.get('/:id', (req, res) => {
	GrowthLog.findOne({
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
/	update a growth log by ID		- POST	*/
growthLogController.put('/:id', (req, res) => {
	var newLog = req.body.growthlog;
	GrowthLog.update(
		{
			check_date:	newLog.check_date,
			length:		newLog.length,
			weight:		newLog.weight,
			childId:		newLog.childId
		},
		{
			where: {
				id:		req.params.id,
				childId:	newLog.childId,
			}
		}
	).then(
		function updateSuccess(logData){
			res.json({
				check_date:	newLog.check_date,
				length:		newLog.length,
				weight:		newLog.weight,
				childId:		newLog.childId
			})
		},
		function updateError(err){
			res.send(500, err.message);
		}
	);
})

/**************************************************
/	Delete a growth log by ID		- POST	*/
growthLogController.delete('/:id', (req, res) => {
	GrowthLog.destroy(
		{
			where: {
				id:		req.params.id,
			}
		}
	).then(
          function deleteLogSuccess(){
               res.send("Growth log successfully deleted.");
          },
          function deleteLogError(err){
               res.send(500, err.message);
          }
     );
});

module.exports = growthLogController;