// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}



// 3. In the `orm.js` file, create the methods that will execute the necessary MySQL commands in
//    the controllers. These are the methods you will need to use in order to retrieve and store
//    data in your database.
//      * `selectAll()`
//      * `insertOne()`
//      * `updateOne()`


// Object for all our SQL statement functions.
var orm = {
  selectAll: function (tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  selectOne: function (table, condition, cb) {
    var queryString = "SELECT * FROM " + table + " WHERE " + condition + ";";
    // console.log("About to fire a SQL query using the command: " + queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne: function (table, cols, vals, cb) {
    // console.log("The ORM insertOne method is now being called. Creating a query string...");
    // console.log("the table param is: " + table);
    // console.log("the cols param is: " + cols);
    // console.log("the vals param is: " + vals);
    // console.log("\n")
    for (var i=0; i<vals.length; i++) {
      if (vals[i] === null || vals[i] === "" || vals[i] === "null")
      {
        vals[i] = null;
      }
    }
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    // console.log(queryString);
    // console.log("\n");

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // An example of condition would be "id = 2"
  updateOne2: function (table, cols, vals, condition, cb) {
    console.log("The ORM updateOne2 method is now being called. Creating a query string...");
    console.log("the table param is: " + table);
    console.log("the cols param is: " + cols);
    console.log("the vals param is: " + vals);
    console.log("the condition param is: " + condition);
    var id = [1];
    id[0] = condition.replace('id = ','');
    console.log("the id param is: " + id);
    for (var i=0; i<vals.length; i++) {
      if (vals[i] === null || vals[i] === "" || vals[i] === "null")
      {
        vals[i] = null;
      }
    }
    var fullVals = id.concat(vals);
    console.log("the fullVals param is: " + fullVals);
    console.log("\n")

    var queryString = "INSERT INTO " + table;
    queryString += " (id, ";
    queryString += cols.toString();
    queryString += ") VALUES (";
    queryString += printQuestionMarks(fullVals.length);
    queryString += ") ON DUPLICATE KEY UPDATE ";
    var updateString = "";
    for (var i=0; i<(cols.length - 1); i++) {
      updateString += cols[i] + " = VALUES(" + cols[i] + "),"
    }
    var finalIndex = cols.length - 1;
    updateString += cols[finalIndex] + " = VALUES(" + cols[finalIndex] + ")" //note no "," at end
    queryString += updateString;

    console.log("So, the final query string is:");
    console.log(queryString);
    console.log("\n");

    connection.query(queryString, fullVals, function (err, result) {
      if (err) {
        throw err;
      }
      console.log("ORM's updateOne2 method just finished. It has a result of: ");
      console.log(result);
      cb(result);
    });
},
  // An example of objColVals would be {devoured:true}
  // An example of condition would be "id = 2"
  updateOne: function (table, objColVals, condition, cb) {
      console.log("The updateOne() method has been called. The first var table is: " + table
    + "\nThe second var objColVals is: " + JSON.stringify(objColVals)
    + "\nThe third var condition is: " + condition
    + "\nand the cb function is defined with these other params in the main_controller.js file.\n");
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      console.log("ORM's updateOne method just finished. It has a result of: ");
      console.log(result);
      cb(result);
    });
  },
  // An example of condition would be "id = 2"
  deleteOne: function (table, condition, cb) {
      console.log("The deleteOne() method has been called. The first var table is: " + table
    + "\nThe second var condition is: " + condition
    + "\nand the cb function is defined with these other params in the main_controller.js file.\n");
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  credentialCheck: function (table, creds, cb) {
    var queryString = "SELECT * FROM " + table + " WHERE email = '" + creds.email + "';";
    console.log("About to fire a SQL query using the command: " + queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      //if we get to this point, we need to check and see if the password is correct
      //TODO: check if password is correct
      console.log("given the supplied email, database returns: ");
      console.log("The password you entered was: " + creds.password + " and the result var is");
      console.log(result);
      cb(result);
    });
  },


};

// Export the orm object for the model 
module.exports = orm;
