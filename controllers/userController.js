const jwt = require('jsonwebtoken');					// Get JSONWebToken functionality as "jwt"
const bcrypt = require('bcryptjs');					// then -> get bcrypt functionality as "bcrypt"
const express = require('express');					// then -> get express functionality as "express"
const userController = express.Router();				// then -> get the express.Router() functionality as "userController"
const { User } = require('../models/index');				// then -> go to the models index to get the user model as "User"

/**************************************************
*	Register a user				- POST	*
***************************************************/
userController.post('/register', function(req, res){
	User.create(
		{
			username: req.body.user.username,
			passwordhash: bcrypt.hashSync(req.body.user.password, 10),
			email: req.body.user.email,
			role: req.body.user.role
		}
	).then(
		function creationSuccess(user) {
			let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
			res.json({		
				message: `${user.role}, ${user.username} created!`,
				sessionToken: token
			});
		},
		function createError(err){
			res.send(500, err.message);
		}
	);
});

/**************************************************
*	Log in a user					- POST	*
***************************************************/
userController.post('/login', function(req, res){
	User.findOne(
		{where: {username: req.body.user.username}}
	).then(function(user){
		bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){
			if (matches) {
				var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
				res.json({
					message: `Welcome, ${user.username}!`,
					sessionToken: token
				});
			} else {
				res.status(502).send({error: "Failure to authenticate."});
			}
		})
	});
});

/***************************************************
*	Get all users 									- GET		*
***************************************************/
userController.get('/', (req, res) => {
	User.findAll().then(
		(users) => {
               res.json(users);
          },
          (err) => {
               res.send(500, err.message);
		}
	)
});

/***************************************************
*	Update user information by ID			 	- PUT		*
***************************************************/
userController.put('/:id', (req, res) => {
	User.update(
		{
			username: req.body.user.username,
			passwordhash: bcrypt.hashSync(req.body.user.password, 10),
			email: req.body.user.email,
			role: req.body.user.role
		},
		{
			where: {
				id: req.params.id
			}
		}
		).then(
		function updateSuccess(updatedUser){
			res.json({
				username: req.body.user.username,
				passwordhash: req.body.user.username,
				email: req.body.user.email,
				role: req.body.user.role
			})
		},
		function updateError(err){
			res.send(500, err.message);
		}
	);
});

/***************************************************
*	Delete user by ID								- DELETE	*
***************************************************/
userController.delete('/:id', (req, res) => {
	User.destroy(
		{
			where: {
				id: req.params.id
			}
		}
	).then(
		function deleteLogSuccess(){
			res.send('User successfully deleted');
		},
		function deleteLogError(err){
			res.send(500, err.message);
		}
	)
})

module.exports = userController;