import React, { Component } from "react";
// import DeleteBtn from "../components/DeleteBtn";
// import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class UserLogin extends Component {
  state = {
    email: "",
    password: "",
    //this holds the error message text that displays near the form when login fails
    errorMsg: ""
  };

  componentDidMount() {
    //need to do a check to make sure a user isn't currently logged in, if so, need to
    //destroy the session id
    this.logOutCurrentUser();
  };

  logOutCurrentUser = () => {
    API.userLoggedIn()
      .then(res => {
        console.log("The userlogin component got an answer back from the API. the result was:");
        console.log(res);
        console.log("So the user id of the currently logged in user is: ");
        console.log(res.data.userId);
        if (res.data.userId) {
          API.userLogOut()
            .then(res => {
              //rerender the login page so the navbar will now display "log in" istead of user greeting
              window.location.assign("/UserLogin")
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };

  // loadUsers = () => {
  //   // console.log("Need to do an API call from UserView...");
  //   API.getUsers()
  //     .then(res => {
  //       // console.log("the API call should be done. now use the returned json to set the state.");
  //       // console.log("At this point, the res.data has " + res.data.users.length + " number of users.");
  //       this.setState({ users: res.data.users });
  //     })
  //     .catch(err => console.log(err));
  // };

  //TODO :: Figure out what happens when user logs in
  handleSuccessfulLogin = (id) => {
    console.log("The view got a response from the backend on the login question. It was:");
    console.log(id);
    // API.getUser(id)
    //   .then()
    //   .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // console.log("Handle form submit just fired. Need to do an API call...");
    event.preventDefault();
    if (this.state.email && this.state.password) {
      API.checkUser({
        email: this.state.email,
        password: this.state.password
      })
        .then(res => {
          // this.handleSuccessfulLogin(res)
          // console.log("the api request for user login should be done now. The response was:");
          // console.log(res.data);
          // console.log("the userlogin view needs to make a decision")
          if (res.data.length !== 0) {
            //since user is succefully logged in, reload the home page
            window.location.assign("/");
          }
          else {
            // console.log("the userlogin view now knows that the login faailed. view needs to handle that.");
            this.setState({ errorMsg: "Login Failed. Try Again." })
          }
        }
        )
        .catch(err => console.log(err));
    }
  };

  render() {
    // console.log("The render method just got fired. At this point, the state has: " + this.state.users.length + " users.");
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <h1>Login:</h1>
            <h3 className="errorMessage">{this.state.errorMsg}</h3>
            <form>
              <Input
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="email address"
              />
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="password"
              />
              <FormBtn
                disabled={!(this.state.email && this.state.password)}
                onClick={this.handleFormSubmit}
              >
                Log In
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UserLogin;
