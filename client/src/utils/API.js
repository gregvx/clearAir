import axios from "axios";

export default {
  // Gets all locations
  getLocations: function() {
    return axios.get("/api/locations");
  },
  // Gets the location with the given id
  getLocation: function(id) {
    return axios.get("/api/locations/" + id);
  },
  // Deletes the location with the given id
  deleteLocation: function(id) {
    return axios.delete("/api/locations/" + id);
  },
  // Saves a location to the database
  saveLocation: function(locationData) {
    return axios.post("/api/locations", locationData);
  },

  // Gets all users
  getUsers: function() {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a user to the database
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  }
};