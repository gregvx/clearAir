// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var user = {
  selectAll: function(cb) {
    orm.selectAll("users", function(res) {
      cb(res);
    });
  },
  selectOne: function(condition, cb) {
    // console.log("The selectOne method just fired on the user object for condition: " + condition);
    orm.selectOne("users", condition, function(res) {
      cb(res);
    });
  },
  login: function(creds, cb) {
    // console.log("The login method just fired on the user object for creds: ");
    // console.log(creds);
    orm.credentialCheck("users", creds, function(res) {
      // console.log("the user model just got a result back from the ORM. It is: ");
      // console.log(res);
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: function(cols, vals, cb) {
    orm.insertOne("users", cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("users", objColVals, condition, function(res) {
      cb(res);
    });
  },
  updateOne2: function (cols, vals, condition, cb) {
    orm.updateOne2("users", cols, vals, condition, function (res) {
      cb(res);
    });
  },
  deleteOne: function(condition, cb) {
    orm.deleteOne("users", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (usersController.js).
module.exports = user;