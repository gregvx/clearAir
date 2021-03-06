import "./App.css";


import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeView from "./pages/HomeView";
import LocationsView from "./pages/LocationsView";
import LocationEdit from "./pages/LocationEdit";
import ActivitiesView from "./pages/ActivitiesView";
import ActivityEdit from "./pages/ActivityEdit";
import UsersView from "./pages/UsersView";
import UserEdit from "./pages/UserEdit";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import NavSpacer from "./components/NavSpacer";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <NavSpacer />
        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route exact path="/locations" component={LocationsView} />
          <Route exact path="/locations/:id" component={LocationEdit} />
          <Route exact path="/activities" component={ActivitiesView} />
          <Route exact path="/activities/:id" component={ActivityEdit} />
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