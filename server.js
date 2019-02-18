const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
//dont know what this line dowes, but may be neeed for sessions to work right on heroku.
app.set('trust proxy', 1);
const session = require("express-session");


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Serve static content for the app from the "public" directory in the application directory.
// app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//this invokes the expres-session library and creates a cookie
//the route method api/userLogin in the main controller returns ths cookie
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

// Import routes and give the server access to them.
var routes = require("./controllers/main_controller.js");
app.use(routes);


// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
