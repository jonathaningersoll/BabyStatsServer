const express = require('express');					// then -> get express functionality as "express"
const childController = express.Router();				// then -> get the express.Router() functionality as "userController"
const { Child } = require('../models/index');			// then -> go to the models index to get the user model as "User"

childController.get('/test', (req, res) => {
	res.send('welcome to the child controller');
})

/**************************************************
/	Create a child					- POST	*/
childController.post('/', (req, res) => {
	var newChild = req.body.child;
	Child.create(
		{
			// Get user.id from decrypted token and add it to the 
			// - userId column in Child table.
			userId: req.user.id,
			name: newChild.name,
			dob: newChild.dob,
			birth_weight: newChild.birth_weight,
			birth_length: newChild.birth_length
		}
	).then(
          function createSuccess(childData) {
                    res.json({
                         child: childData
                    });
               },
               function createError(err) {
                    res.send(500, err.message);
               }
          );
});

/**************************************************
/	Get all children				- GET	*/
childController.get('/', (req, res) => {
	Child.findAll({
		where: {
			userId: req.user.id
		}
	}).then(
          function findAllSuccess(children) {
               res.json(children);
          },
          function findAllError(err) {
               res.send(500, err.message);
		}
	);
})

/**************************************************
/	Get a child by child ID			- GET	*/
childController.get('/:id', (req, res) => {
	Child.findOne({
		where: {
			id: req.params.id,
			userId: req.user.id
		},
		include: [
			'foodlogs',
			'sleeplogs',
			'diaperlogs',
			'growthlogs'
		]

	}).then(
		function findOneSuccess(child) {
               res.json(child);
          },
          function findOneError(err) {
               res.send(500, err.message);
          }
	);
});

/**************************************************
/	Update a child by child ID		- GET	*/
childController.put('/:id', (req, res) => {
	upChild = req.body.child;
	Child.update({									// Assign new values to the child
			name: upChild.name,
			dob: upChild.dob,
			birth_weight: upChild.birth_weight,
			birth_length: upChild.birth_length
	},
	{
		where: {									// where the child.id matches and the user id matches.
			id: req.params.id,
			userId: req.user.id,
		}

	}).then(
		function updateSuccess(upchild){
			res.json({							// Respond with the updated information
				name: upChild.name,
				dob: upChild.dob,
				birth_weight: upChild.birth_weight,
				birth_length: upChild.birth_length
			})
		},
		function updateError(err){
			res.send(500, err.message);
		}
	);
});

/**************************************************
/	Delete a child by child ID		- GET	*/
childController.delete('/:id', (req, res) => {
	Child.destroy({
		where: {
			id: req.params.id,
			userId: req.user.id
		}
	}).then(
          function deleteLogSuccess(){
               res.send("Child successfully deleted.");
          },
          function deleteLogError(err){
               res.send(500, erro.message);
          }
     )
})

module.exports = childController;