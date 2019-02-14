// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var activity = {
  selectAll: function(cb) {
      // console.log("About to ask the orm for activities...");
    orm.selectAll("activities", function(res) {
      cb(res);
    });
  },
  selectOne: function(condition, cb) {
    // console.log("The selectOne method just fired on the location object for condition: " + condition);
    orm.selectOne("activities", condition, function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: function(cols, vals, cb) {
    orm.insertOne("activities", cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("activities", objColVals, condition, function(res) {
      cb(res);
    });
  },
  updateOne2: function(cols, vals, condition, cb) {
    orm.updateOne2("activities", cols, vals, condition, function(res) {
      cb(res);
    });
  },
  deleteOne: function(condition, cb) {
    orm.deleteOne("activities", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (locationsController.js).
module.exports = activity;