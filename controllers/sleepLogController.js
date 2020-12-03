const express = require('express');							// then -> get express functionality as "express"
const sleepLogController = express.Router();					// then -> get the express.Router() functionality as "userController"
const { SleepLog } = require('../models/index');				// then -> go to the models index to get the user model as "User"

sleepLogController.get('/', (req, res) => {
	res.send('welcome to the sleep log controller');
});

/**************************************************
/	Create a sleep log				- POST	*/
sleepLogController.post('/', (req, res) => {
	var newLog = req.body.sleeplog;
	console.log(newLog);
	SleepLog.create({
		sleep_start:	newLog.start,
		sleep_stop:	newLog.stop,
		childId:		newLog.childId
	}).then(
		function createSuccess(logData) {
			res.json({
				sleeplog: logData
			});
		},
		function createError(err) {
			res.send(500, err.message);
		}
	)
})

/**************************************************
/	Get a sleep log by ID			- GET	*/
sleepLogController.get('/:id', (req, res) => {
	SleepLog.findOne({
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
/	update a sleep log by ID			- POST	*/
sleepLogController.put('/:id', (req, res) => {
	var newLog = req.body.sleeplog;
	SleepLog.update(
		{
			sleep_start:	newLog.start,
			sleep_stop:	newLog.stop
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
				sleep_start:	newLog.start,
				sleep_stop:	newLog.stop
			})
		},
		function updateError(err){
			res.send(500, err.message);
		}
	);
})

/**************************************************
/	Delete a sleep log by ID			- POST	*/
sleepLogController.delete('/:id', (req, res) => {
	SleepLog.destroy(
		{
			where: {
				id:		req.params.id,
			}
		}
	).then(
          function deleteLogSuccess(){
               res.send("Sleep log successfully deleted.");
          },
          function deleteLogError(err){
               res.send(500, err.message);
          }
     );
});

module.exports = sleepLogController;