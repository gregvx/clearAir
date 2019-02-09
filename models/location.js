// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var location = {
  selectAll: function(cb) {
    orm.selectAll("locations", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: function(cols, vals, cb) {
    orm.insertOne("locations", cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne: function(table, objColVals, condition, cb) {
    orm.updateOne(table, objColVals, condition, function(res) {
      cb(res);
    });
  },
  deleteOne: function(table, condition, cb) {
    orm.deleteOne(table, condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (locationsController.js).
module.exports = location;