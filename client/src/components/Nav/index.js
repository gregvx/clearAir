import React from "react";
import "./style.css";

function Nav() {
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
          <li className="nav-item">
            <a className="nav-link" href="/locations">
              Locations
          </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/activities">
              Activities
          </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/users">
              Users
          </a>
          </li>
        </ul>
      <ul className="nav navbar-nav navbar-right">
        <li className="nav-item">
          <a className="nav-link" href="/userRegister">
            Sign Up
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/userLogin">
            Login
          </a>
        </li>
      </ul>
      </div>
    </nav>
  );
}

export default Nav;
