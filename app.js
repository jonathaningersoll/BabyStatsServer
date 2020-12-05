require('dotenv').config();                                           // pull in dotenv
const express = require('express');                                   // then -> pull in express as "express"
const db = require('./db');                                           // then -> execute db.js
const bsApp = express();                                       // then -> save the express functionality as app

// Controllers:
bsControllers = require('./controllers');
// const cors = require("cors");

// Express-JSON converter
bsApp.use(express.json());
// bsApp.use(cors());
bsApp.use(require('./middleware/headers'));
// Open routes //
bsApp.use('/user', bsControllers.User);

// But these are protected, dude! //
bsApp.use(require('./middleware/validate'));
bsApp.use('/child', bsControllers.Child);
bsApp.use('/foodlog', bsControllers.FoodLog);
bsApp.use('/sleeplog', bsControllers.SleepLog);
bsApp.use('/diaperlog', bsControllers.DiaperLog);
bsApp.use('/growthlog', bsControllers.GrowthLog);

db.sync();                                                            // then -> synchronize the database with the models
// db.sync({force: true});

bsApp.listen(process.env.PORT, function(){
     console.log('Baby Stats App is listening on port 3030...');
});