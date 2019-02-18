# clearAir

This is a React.js MVC app with a MySQL database deployed to Heroku.

This webapp allows users to view outdoor recreation activities closest to them that will be in a part of the Wasatch Front where the air quality forcast from the Utah Division of Environmental Quality is "Moderate" or better.

The Utah DEQ website is scraped with Axios and the information is parsed with Cheerio.

A MySQL database stores user location information and outdoor recreation activities so registered users can be presented with outdoor recreation options that will be in locations where the air pollution forcast predicts good quality air and where the distance from the users location will be as minimal as possible.

This app is oriented toward users on Utah's Wasatch Front who have certain respiratory conditions that increase their sensitivity to air pollution but would like ideas on where to safely recreate outside that minimizes the proposed distance from their location.

This was built and designed as a final project for a coding bootcamp at the University of Utah. The idea was my own. The required paramaters for the assignment were as follows:

* Must use ReactJS.
* Must use a Node and Express Web Server.
* Must be backed by a MySQL or MongoDB Database with a Sequelize or Mongoose ORM.
* Must have both GET and POST routes for retrieving and adding new data.
* Must be deployed using Heroku (with Data).
* Must utilize at least two libraries, packages, or technologies that we haven't discussed.
    (This app utilized the express-session and bcrypt packages to meet this requirement)
* Must allow for or involve the authentication of users in some way.
* Must have a polished frontend / UI.
* Must have folder structure that meets MVC Paradigm.
* Must meet good quality coding standards (indentation, scoping, naming).

The app is deployed to Heroku, and can be viewed 
[here](https://clearair.herokuapp.com)
