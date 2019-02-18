// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var location = {
  selectAll: function(cb) {
    orm.selectAll("locations", function(res) {
      cb(res);
    });
  },
  selectOne: function(condition, cb) {
    // console.log("The selectOne method just fired on the location object for condition: " + condition);
    orm.selectOne("locations", condition, function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: function(cols, vals, cb) {
    orm.insertOne("locations", cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("locations", objColVals, condition, function(res) {
      cb(res);
    });
  },
  updateOne2: function (cols, vals, condition, cb) {
    orm.updateOne2("locations", cols, vals, condition, function (res) {
      cb(res);
    });
  },
  deleteOne: function(condition, cb) {
    orm.deleteOne("locations", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (locationsController.js).
module.exports = location;
