import React from "react";

function Nav() {
  return (
    // <nav className="navbar navbar-expand-lg navbar-default bg-primary">
    <nav className="navbar navbar-expand-md navbar-default navbar-fixed-top">
      <ul className="nav navbar-nav mr-auto">
        <li className="nav-item">
          <a className="navbar-brand nav-link" href="/">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/locations">
            Locations
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/users">
            Users
          </a>
        </li>
      </ul>
      <ul className="nav navbar-nav">
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
    </nav>
  );
}

export default Nav;
