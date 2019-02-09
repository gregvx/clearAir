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
import HomeView from "./pages/HomeView";
import LocationsView from "./pages/LocationsView";
import LocationEdit from "./pages/LocationEdit";
import UsersView from "./pages/UsersView";
import UserEdit from "./pages/UserEdit";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route exact path="/locations" component={LocationsView} />
          <Route exact path="/locations/:id" component={LocationEdit} />
          <Route exact path="/users" component={UsersView} />
          <Route exact path="/users/:id" component={UserEdit} />
          <Route exact path="/userRegister" component={UserRegister} />
          <Route exact path="/userLogin" component={UserLogin} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;