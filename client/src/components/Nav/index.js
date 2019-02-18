// import React from "react";
import API from "../../utils/API";
import React, { Component } from "react";
import "./style.css";

class Nav extends Component {
  state = {
    loginText: "Log In",
    adminLoggedIn: false
  };

  componentDidMount() {
    console.log("The navbar component has mounted")
    this.askAboutLogin();
  }

  askAboutLogin = () => {
    console.log("nav component needs to make an api call...");
    API.userLoggedIn()
      .then(res => {
        console.log("The nav component got an answer back from the API. the result was:");
        console.log(res);
        console.log("So the user id of the currently logged in user is: ");
        console.log(res.data.userId);
        if (res.data.userId) {
          this.setState({ loginText: res.data.userEmail + " Log Out"});
          //TODO check the res.data to see if isAdmin field for user is true or false and then set state accordingly
          this.setState({ adminLoggedIn: true });
        }
        else {
          this.setState({ loginText: "Log In" });
        }

      })
      .catch(err => console.log(err));
  };

  render() {
    //first we set up some jsx for links that may or may not need to be displayed
    let LocationLink;
    let ActivityLink;
    let UserLink;
    const adminLoggedIn = this.state.adminLoggedIn;
    if (adminLoggedIn) {
      LocationLink =
        <li className="nav-item">
          <a className="nav-link" href="/locations">
            Locations
          </a>
        </li>
    }
    else {
      LocationLink = ""
    }
    if (adminLoggedIn) {
      ActivityLink =
        <li className="nav-item">
          <a className="nav-link" href="/activities">
            Activities
          </a>
        </li>
    }
    else {
      ActivityLink = ""
    }
    if (adminLoggedIn) {
      UserLink =
        <li className="nav-item">
          <a className="nav-link" href="/users">
            Users
          </a>
        </li>
    }
    else {
      UserLink = ""
    }

    return (
      // <nav className="navbar navbar-expand-lg navbar-default bg-primary">
      <nav className="navbar navbar-expand-md navbar-default navbar-fixed-top">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse1">
            {/* 3 span tags here to make the button have three lines in it. */}
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbar-collapse1">
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
            </a>
            </li>
            {LocationLink}
            {ActivityLink}
            {UserLink}
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item">
              <a className="nav-link" href="/userRegister">
                Register
            </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/userLogin">
                {this.state.loginText}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

}


export default Nav;
