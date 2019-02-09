var express = require("express");
var router = express.Router();

// Import the model (user.js) to use its database functions.
var user = require("../models/user.js");
var location = require("../models/location.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  // console.log("custom route for root just fired.");
  location.selectAll(function(data) {
    var locationsArray = {
      locations: data
    };
    console.log(locationsArray);
    res.json(locationsArray);
  });
});

//get all locations
router.get("/api/locations", function(req, res) {
  console.log("custom route for locations get just fired.");
  location.selectAll(function(data) {
    var locationsArray = {
      locations: data
    };
    console.log(locationsArray);
    res.json(locationsArray);
  });
});

//post/create a single location
router.post("/api/locations", function(req, res) {
  console.log("custom route for locations put just fired.");
  location.insertOne(["location_name"], [req.body.location_name], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

//get a single location for review
router.get("/api/locations/:id", function(req, res) {
  console.log("custom route for a single location get method just fired.");
  var condition = "id = " + req.params.id;
  location.selectOne(condition, function(data) {
    res.json(data);
  });
});

//edit a location
router.put("/api/locations/:id", function(req, res) {
  console.log("in the controller method for editing a location with the id of: " + req.params.id);
  var condition = "id = " + req.params.id;
  console.log("condition", condition);
  location.updateOne(
    "locations",
    {
      location_name: req.body.location_name
    },
    condition,
    function(result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

//delete a location
router.delete("/api/locations/:id", function(req, res) {
  console.log("in the controller method for deleting a location with the id of: " + req.params.id);
  var condition = "id = " + req.params.id;
  console.log("condition", condition);
  location.deleteOne(
    "locations",
    condition,
    function(result) {
      console.log("Just attempted to delete a row in the DB. affectedRows is: " + result.affectedRows);
      // return res.json(result);
      if (result.affectedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});


//get all users
router.get("/api/users", function(req, res) {
  console.log("custom route for user get just fired.");
  user.selectAll(function(data) {
    var usersArray = {
      users: data
    };
    console.log(usersArray);
    res.render(usersArray);
  });
});

//post/create a single user
router.post("/api/users", function(req, res) {
  user.insertOne(["email", "first_name", "last_name", "password_hash", "salt", "home_id", "work_id", "school_id"], 
        [req.body.email, req.body.first_name, req.body.last_name, req.body.password_hash, req.body.salt, req.body.home_id], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

// edit a user
router.put("/api/users/:id", function(req, res) {
  console.log("in the controller method for editing status of a user with the id of: " + req.params.id);
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  user.updateOne(
    {
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password_hash: req.body.password_hash,
      salt: req.body.salt,
      home_id: req.body.home_id,
      work_id: req.body.work_id,
      school_id: req.body.school_id
    },
    condition,
    function(result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});


// Export routes for server.js to use.
module.exports = router;
