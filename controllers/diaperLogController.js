const express = require('express');									// then -> get express functionality as "express"
const diaperLogController = express.Router();					// then -> get the express.Router() functionality as "diaperLogController"
const { DiaperLog } = require('../models/index');				// then -> go to the models index to get the user model as "DiaperLog"

diaperLogController.get('/test', (req, res) => {
	res.send('welcome to the diaper log controller');
});

/**************************************************
/	Create a diaper log				- POST	*/
diaperLogController.post('/', (req, res) => {
	var newLog = req.body.diaperlog;
	DiaperLog.create({
		time_checked:	newLog.time_checked,
		dirty:		newLog.dirty,
		wet:			newLog.wet,
		dry:			newLog.dry,
		childId:		newLog.childId
	}).then(
		function createSuccess(logData) {
			res.json({
				diaper: logData
			});
		},
		function createError(err) {
			res.send(500, err.message);
		}
	)
})

/**************************************************
/	Get a diaper log by ID			- GET	*/
diaperLogController.get('/:id', (req, res) => {
	DiaperLog.findOne({
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
/	update a diaper log by ID		- POST	*/
diaperLogController.put('/:id', (req, res) => {
	var newLog = req.body.diaperlog;
	DiaperLog.update(
		{
			time_checked:	newLog.time_checked,
			dirty:		newLog.dirty,
			wet:			newLog.wet,
			dry:			newLog.dry,
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
				time_checked:	newLog.time_checked,
				dirty:		newLog.dirty,
				wet:			newLog.wet,
				dry:			newLog.dry,
				childId:		newLog.childId
			})
		},
		function updateError(err){
			res.send(500, err.message);
		}
	);
})

/**************************************************
/	Delete a diaper log by ID		- POST	*/
diaperLogController.delete('/:id', (req, res) => {
	DiaperLog.destroy(
		{
			where: {
				id:		req.params.id,
			}
		}
	).then(
          function deleteLogSuccess(){
               res.send("Diaper log successfully deleted.");
          },
          function deleteLogError(err){
               res.send(500, err.message);
          }
     );
});

module.exports = diaperLogController;