const User = require("./UserModel");
const Child = require("./ChildModel");
const FoodLog = require("./FoodLogModel");
const SleepLog = require("./SleepLogModel");
const DiaperLog = require("./DiaperLogModel");
const GrowthLog = require("./GrowthLogModel");

Child.belongsTo(User);
Child.hasMany(FoodLog);
Child.hasMany(SleepLog);
Child.hasMany(DiaperLog);
Child.hasMany(GrowthLog);

module.exports = {
     User,
     Child,
     FoodLog,
     SleepLog,
     DiaperLog,
     GrowthLog
}