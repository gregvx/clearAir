// import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload--GvA!!.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Locations from "./pages/Locations";
import LocationDetail from "./pages/LocationDetail";
// import Users from "./pages/Users";
// import UserDetail from "./pages/UserDetail";
// import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Locations} />
          <Route exact path="/locations" component={Locations} />
          <Route exact path="/locations/:id" component={LocationDetail} />
          {/* <Route exact path="/users" component={Users} /> */}
          {/* <Route exact path="/users/:id" component={UserDetail} /> */}
          {/* <Route component={NoMatch} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;