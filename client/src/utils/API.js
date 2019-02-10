import axios from "axios";

export default {
  // Gets all locations
  getLocations: function () {
    return axios.get("/api/locations");
  },
  // Gets the location with the given id
  getLocation: function (id) {
    return axios.get("/api/locations/" + id);
  },
  // Deletes the location with the given id
  deleteLocation: function (id) {
    return axios.delete("/api/locations/" + id);
  },
  // Saves a location to the database
  saveLocation: function (locationData) {
    return axios.post("/api/locations", locationData);
  },
  // Edits a location in the database
  editLocation: function (id, locationData) {
    // console.log("The api method editLocation just got called. The id param is: " + id + " and the locationData param is: " + locationData.location_name);
    return axios.put("/api/locations/" + id, locationData);
  },

  // Gets all users
  getUsers: function () {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function (id) {
    return axios.get("/api/users/" + id);
  },
  // Deletes the user with the given id
  deleteUser: function (id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a user to the database
  saveUser: function (userData) {
    // console.log("The saveUser method just got called in the API. attempting now...");
    return axios.post("/api/users", userData);
  },
   // Edits a user in the database
   editUser: function (id, userData) {
    // console.log("The api method editUser just got called. The id param is: " + id + " and the userData param is: " + userData);
    return axios.put("/api/users/" + id, userData);
  },

  //scrape the DEQ website
  getDeqData: function(address) {
    console.log("The api method getDeqData just got called with the param: " + address.href);
    return axios.put("/api/scrape",  address);
  }

};