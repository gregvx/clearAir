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
import LocationsView from "./pages/LocationsView";
import LocationEdit from "./pages/LocationEdit";
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
          <Route exact path="/" component={LocationsView} />
          <Route exact path="/locations" component={LocationsView} />
          <Route exact path="/locations/:id" component={LocationEdit} />
          {/* <Route exact path="/users" component={Users} /> */}
          {/* <Route exact path="/users/:id" component={UserDetail} /> */}
          {/* <Route component={NoMatch} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;