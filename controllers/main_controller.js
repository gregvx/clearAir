var express = require("express");
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
var moment = require("moment");
var bcrypt = require('bcrypt');

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

//edit location2
//(this differs from edit a location(1) in that the paramatrs are given in two arrays instead of a single object)
router.put("/api/locations2/:id", function (req, res) {
  // console.log("in the controller method for editing a location with the id of: " + req.params.id);
  var condition = "id = " + req.params.id;
  // console.log("condition", condition);
  location.updateOne2(
    ["location_name"],
    [req.body.location_name],
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

//get some activities
router.get("/api/someactivities/:month", function (req, res) {
  var myMonth = req.params.month;
  // console.log("custom route for someactivities get just fired. month of interest is: " + myMonth);
  var dbField = "jan_avail";
  switch (myMonth) {
    case '1':
      dbField = "jan_avail";
      break;
    case '2':
      dbField = "feb_avail";
      break;
    case '3':
      dbField = "mar_avail";
      break;
    case '4':
      dbField = "apr_avail";
      break;
    case '5':
      dbField = "may_avail";
      break;
    case '6':
      dbField = "jun_avail";
      break;
    case '7':
      dbField = "jul_avail";
      break;
    case '8':
      dbField = "aug_avail";
      break;
    case '9':
      dbField = "sep_avail";
      break;
    case '10':
      dbField = "oct_avail";
      break;
    case '11':
      dbField = "nov_avail";
      break;
    case '12':
      dbField = "dec_avail";
      break;
    default:
      dbField = "jan_avail";
  }
  var condition = dbField + " = 1";
  activity.selectSome(condition, function (data) {
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
  // console.log("custom route for activities put just fired in the main controller.");
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
  console.log("main controller route for user get just fired.");
  console.log("the seesion info is: ")
  console.log(req.session);
  user.selectAll(function (data) {
    var usersArray = {
      users: data
    };
    // console.log(usersArray);
    res.json(usersArray);
  });
});

//post/create a single user
router.post("/api/users", function (req, res) {
  console.log("Route for users put/create just fired.");
  //take the password, create a salt, and create a hash
  var unencryptedPass = req.body.password;
  //TODO create a salt
  //TODO hash halt and unencrypted password
  bcrypt.hash(unencryptedPass, 10, function (err, hash) {
    //we are inside a cb func now to ensure that we wait until hash is created, then store
    //it in the database
    var salt = "1234";
    // var hash = "5678";
    //use the hash created above to add salt and hash values to the database
    console.log("The hash has now been created. It is: ");
    console.log(hash);
    user.insertOne(["email", "first_name", "last_name", "password_hash", "salt", "home_id", "work_id", "school_id"],
      [req.body.email, req.body.first_name, req.body.last_name, hash, salt, req.body.home_id, req.body.work_id, req.body.school_id], function (result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
      });
  })
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
  // console.log("main controller route for user login method just fired.");
  // console.log("need to ask about the user params supplied which were: ");
  // console.log(req.body);
  user.login(req.body, function (data) {
    // console.log("the main controller just got a response from the api call and it is");
    // console.log(data);
    // console.log("or, more precisely, ");
    // console.log(data[0]);
    //if data[0] is undefined, no user exists in the database with that email
    if (data[0]) {
      //the condition here only works if some row was returned from the database. since the email
      //must therefore be good, lets check the password
      // console.log("Now, we need to check the password " + req.body.password + " against the hash " + data[0].password_hash)
      bcrypt.compare(req.body.password, data[0].password_hash, function(suberr, subres) {
        if(subres) {
          //passwords match
          //so, now we know the user supplied a valid email address and password
          // console.log("So now, we set the req.session.userId to " + data[0].id);
          req.session.userId = data[0].id;
          req.session.userEmail = data[0].email;
          req.session.isAdmin = data[0].isAdmin;
          req.session.firstName = data[0].first_name;
          // console.log("The session is now: ");
          // console.log(req.session);
          res.json({authCheck: "authenticated"});
        }
        else {
          //passwords don't match
          // console.log("main controller method now knows that login failed due to a bad password.");
          // console.log("The session is now: ");
          // console.log(req.session);
          //since the password is bad on this known user, we need to zero out the user data in
          //the API response before passing it to the view that called this method
          // console.log("and the data is now: ");
          data = [];
          res.json({authCheck: "failed"});
        }
      });
    }
    else {
      // console.log("main controller method now knows that login failed due to an invalid email address.");
      // console.log("The session is now: ");
      // console.log(req.session);
      res.json({authCheck: "failed"});
    }
  });
});

// check session id for user logged in
router.get("/api/userLoggedIn", function (req, res) {
  // console.log("userLoggedIn method firing from main controller. going to return the session info: ");
  // console.log(req.session);
  res.json(req.session);
});

// log out the user and update the session
router.post("/api/userLogOut", function (req, res) {
  // console.log("userLogOut method firing from main controller. going to return the new session info: ");
  req.session.destroy();
  // console.log(req.session);
  res.json(req.session);
});

//edit a user2 
//(this differs from edit a user(1) in that the paramatrs are given in two arrays instead of a single object)
router.put("/api/users2/:id", function (req, res) {
  // console.log("in the controller method for editing a user with the id of: " + req.params.id);
  var condition = "id = " + req.params.id;
  // console.log("condition", condition);
  user.updateOne2(["email",
    "first_name",
    "last_name",
    "home_id",
    "work_id",
    "school_id"
  ],
    [req.body.email,
    req.body.first_name,
    req.body.last_name,
    req.body.home_id,
    req.body.work_id,
    req.body.school_id
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

// edit a user
router.put("/api/users/:id", function (req, res) {
  // console.log("in the controller method for editing a user with the id of: " + req.params.id);
  var condition = "id = " + req.params.id;
  // console.log("condition", condition);
  user.updateOne(
    {
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      // password_hash: req.body.password_hash,
      // salt: req.body.salt,
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
  // console.log("in the controller method for deleting a user with the id of: " + req.params.id);
  var condition = "id = " + req.params.id;
  // console.log("condition", condition);
  user.deleteOne(
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



// ------------------------Start DateCheck-----------------

// A GET route for getting the date
router.get("/api/getdate", function (req, res) {
  // First, we use moment.js to get the date
  var currentTimeObject = moment();
  // var myDateTime = moment().format("MMM Do YYYY, h:mm:ss a");
  var myDate = moment().format("MMM Do YYYY");
  var myMonth = moment().format("M");
  // console.log("the current time is: " + myDateTime + " and the month is " + myMonth);
  var result = { fullDate: myDate, justMonth: myMonth };
  // console.log("going to send the following back to the client:");
  // console.log(result);
  // console.log(currentTimeObject);
  res.json(result);
});


// ------------------------End Scraper--------------------


// ------------------------Start Login-----------------

// A GET route for login
router.get("/api/userLogin", function (req, res) {
  if (req.session.view) {
    req.session.views++;
  }
  else {
    req.session.views = 1;
  }
  console.log(req.session);
  res.json({});
});


// ------------------------End Login--------------------

// Export routes for server.js to use.
module.exports = router;
