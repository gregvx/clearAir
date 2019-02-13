var express = require("express");
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");

// Import the model (user.js) to use its database functions.
var user = require("../models/user.js");
var location = require("../models/location.js");
var activity = require("../models/activity.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  // console.log("custom route for root just fired.");
  location.selectAll(function (data) {
    var locationsArray = {
      locations: data
    };
    console.log(locationsArray);
    res.json(locationsArray);
  });
});




// --------------------------Start Locations--------------------


//get all locations
router.get("/api/locations", function (req, res) {
  // console.log("custom route for locations get just fired.");
  location.selectAll(function (data) {
    var locationsArray = {
      locations: data
    };
    // console.log(locationsArray);
    res.json(locationsArray);
  });
});

//post/create a single location
router.post("/api/locations", function (req, res) {
  // console.log("custom route for locations put just fired.");
  location.insertOne(["location_name"], [req.body.location_name], function (result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

//get a single location for review
router.get("/api/locations/:id", function (req, res) {
  // console.log("custom route for a single location get method just fired.");
  var condition = "id = " + req.params.id;
  location.selectOne(condition, function (data) {
    res.json(data);
  });
});

//edit a location
router.put("/api/locations/:id", function (req, res) {
  // console.log("in the controller method for editing a location with the id of: " + req.params.id);
  var condition = "id = " + req.params.id;
  // console.log("condition", condition);
  location.updateOne(
    {
      location_name: req.body.location_name
    },
    condition,
    function (result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

//delete a location
router.delete("/api/locations/:id", function (req, res) {
  // console.log("in the controller method for deleting a location with the id of: " + req.params.id);
  var condition = "id = " + req.params.id;
  // console.log("condition", condition);
  location.deleteOne(
    condition,
    function (result) {
      // console.log("Just attempted to delete a row in the DB. affectedRows is: " + result.affectedRows);
      // return res.json(result);
      if (result.affectedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

// --------------------------End Locations--------------------






// --------------------------Start Activities--------------------


//get all activities
router.get("/api/activities", function (req, res) {
  // console.log("custom route for activities get just fired. Or maybe im actually the cb.");
  activity.selectAll(function (data) {
    var activitiesArray = {
      activities: data
    };
    // console.log(activitiesArray);
    // console.log("just consolelogged the activites returned from the db in the main controller")
    res.json(activitiesArray);
  });
});

//post/create a single activity
router.post("/api/activity", function (req, res) {
  console.log("custom route for activities put just fired in the main controller.");
  activity.insertOne(["act_name",
    "act_desc",
    "act_href",
    "act_img_href",
    "jan_avail",
    "feb_avail",
    "mar_avail",
    "apr_avail",
    "may_avail",
    "jun_avail",
    "jul_avail",
    "aug_avail",
    "sep_avail",
    "oct_avail",
    "nov_avail",
    "dec_avail",
    "latitude",
    "longitude",
    "smog_county"
  ],
    [req.body.act_name,
    req.body.act_desc,
    req.body.act_href,
    req.body.act_img_href,
    req.body.jan_avail,
    req.body.feb_avail,
    req.body.mar_avail,
    req.body.apr_avail,
    req.body.may_avail,
    req.body.jun_avail,
    req.body.jul_avail,
    req.body.aug_avail,
    req.body.sep_avail,
    req.body.oct_avail,
    req.body.nov_avail,
    req.body.dec_avail,
    req.body.latitude,
    req.body.longitude,
    req.body.smog_county
    ], function (result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
});

//get a single activity for review
router.get("/api/activities/:id", function (req, res) {
  // console.log("custom route for a single activity get method just fired.");
  var condition = "id = " + req.params.id;
  activity.selectOne(condition, function (data) {
    res.json(data);
  });
});

//edit a activity2
router.put("/api/activities2/:id", function (req, res) {
  // console.log("in the controller method for editing a activity with the id of: " + req.params.id);
  var condition = "id = " + req.params.id;
  // console.log("condition", condition);
  activity.updateOne2(["act_name",
    "act_desc",
    "act_href",
    "act_img_href",
    "jan_avail",
    "feb_avail",
    "mar_avail",
    "apr_avail",
    "may_avail",
    "jun_avail",
    "jul_avail",
    "aug_avail",
    "sep_avail",
    "oct_avail",
    "nov_avail",
    "dec_avail",
    "latitude",
    "longitude",
    "smog_county"
  ],
    [req.body.act_name,
    req.body.act_desc,
    req.body.act_href,
    req.body.act_img_href,
    req.body.jan_avail,
    req.body.feb_avail,
    req.body.mar_avail,
    req.body.apr_avail,
    req.body.may_avail,
    req.body.jun_avail,
    req.body.jul_avail,
    req.body.aug_avail,
    req.body.sep_avail,
    req.body.oct_avail,
    req.body.nov_avail,
    req.body.dec_avail,
    req.body.latitude,
    req.body.longitude,
    req.body.smog_county
    ],
    condition,
    function (result) {
      if (result.affectedRows != 2 && result.affectedRows != 1) {
        // If one or two rows were not affected on an 'insert with duplicate id' statement, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

//edit a activity
router.put("/api/activities/:id", function (req, res) {
  // console.log("in the controller method for editing a activity with the id of: " + req.params.id);
  var condition = "id = " + req.params.id;
  // console.log("condition", condition);
  activity.updateOne(
    {
      act_desc: req.body.act_desc,
      act_href: req.body.act_href,
      act_img_href: req.body.act_img_href,
      jan_avail: req.body.jan_avail,
      feb_avail: req.body.feb_avail,
      mar_avail: req.body.mar_avail,
      may_avail: req.body.may_avail,
      jun_avail: req.body.jun_avail,
      jul_avail: req.body.jul_avail,
      aug_avail: req.body.aug_avail,
      sep_avail: req.body.sep_avail,
      oct_avail: req.body.oct_avail,
      nov_avail: req.body.nov_avail,
      dec_avail: req.body.dec_avail,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      smog_county: req.body.smog_county
    },
    condition,
    function (result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

//delete an activity
router.delete("/api/activities/:id", function (req, res) {
  // console.log("in the controller method for deleting a activity with the id of: " + req.params.id);
  var condition = "id = " + req.params.id;
  // console.log("condition", condition);
  activity.deleteOne(
    condition,
    function (result) {
      // console.log("Just attempted to delete a row in the DB. affectedRows is: " + result.affectedRows);
      // return res.json(result);
      if (result.affectedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

// --------------------------End Activities--------------------






// --------------------------Start Users--------------------

//get all users
router.get("/api/users", function (req, res) {
  console.log("custom route for user get just fired.");
  user.selectAll(function (data) {
    var usersArray = {
      users: data
    };
    console.log(usersArray);
    res.json(usersArray);
  });
});

//post/create a single user
router.post("/api/users", function (req, res) {
  //take the password, create a salt, and create a hash
  var unencryptedPass = req.body.password;
  var salt = "1234";
  var hash = "5678";
  console.log("Route for users put/create just fired.");
  user.insertOne(["email", "first_name", "last_name", "password_hash", "salt", "home_id", "work_id", "school_id"],
    [req.body.email, req.body.first_name, req.body.last_name, hash, salt, req.body.home_id, req.body.work_id, req.body.school_id], function (result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
});

//get a single user for review
router.get("/api/users/:id", function (req, res) {
  // console.log("custom route for a single user get method just fired.");
  var condition = "id = " + req.params.id;
  user.selectOne(condition, function (data) {
    res.json(data);
  });
});

//check login credentials and return a single user
router.post("/api/userLogin/", function (req, res) {
  // console.log("custom route for user login method just fired.");
  user.login(req.body, function (data) {
    console.log("the main controller just got a response from the api call and it is");
    console.log(data);
    res.json(data);
  });
});

// edit a user
router.put("/api/users/:id", function (req, res) {
  console.log("in the controller method for editing a user with the id of: " + req.params.id);
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
    function (result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

//delete a user
router.delete("/api/users/:id", function (req, res) {
  console.log("in the controller method for deleting a user with the id of: " + req.params.id);
  var condition = "id = " + req.params.id;
  console.log("condition", condition);
  user.deleteOne(
    condition,
    function (result) {
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

// --------------------------End Users--------------------



// ------------------------Start Scraper-----------------

// A GET route for scraping the DEQ website
router.put("/api/scrape", function (req, res) {
  // First, we grab the body of the html with axios
  // console.log("the request body is: ");
  // console.log(req.body);
  // console.log("The main controller method is now working on the scrape. We will use " + req.body.href);
  axios.get(req.body.href).then(function (response) {
    // console.log("The scrape should be complete and the response is now ready to be parsed.");
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
    var days = [];
    // Now, we grab every day div within a threeDayForecast div, and do the following:
    $(".day").each(function (i, element) {
      // Save an empty result object
      var result = {};
      // console.log("We should have an empty result opject here: " + result + " and we should have a day element selectded here: " + this);
      // Add the text and href of every link, and save them as properties of the result object
      result.day = $(this)
        .children("h2")
        .text();
      result.quality = $(this)
        .children("a").children(".healthForecast")
        .text();
      days.push(result);

    });
    // Send a message to the client
    // res.send("Scrape Complete");
    res.json(days);
    // res.json(result);
  });
});


// ------------------------End Scraper--------------------

// Export routes for server.js to use.
module.exports = router;
