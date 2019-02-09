import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
// import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class UsersEdit extends Component {
  state = {
    //this holds a list of current users
    users: [],
    //this holds the data for a new user to create
    email: "",
    first_name: "",
    last_name: "",
    home_id: null,
    work_id: null,
    school_id: null,
    password: ""
  };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    console.log("Need to do an API call from UserView...");
    API.getUsers()
      .then(res => {
        console.log("the API call should be done. now use the returned json to set the state.");
        console.log("At this point, the res.data has " + res.data.users.length + " number of users.");
        this.setState({ users: res.data.users });
      })
      .catch(err => console.log(err));
  };

  // loadUsers = () => {
  //   API.getUsers()
  //     .then(res => {
  //       var that = this;
  //       function step1 (step2) {
  //         //define code to do first:
  //         that.setState({ users: res.data, user_name: "" });
  //         step2();
  //       };
  //       function step2() {
  //         //define second line of code:
  //         console.log("The backend just sent back users. The state is now set. Number of users was: " + that.state.users.length);
  //       };
  //       step1(step2);
  //     })
  //     .catch(err => console.log(err));
  // };

  deleteUser = id => {
    API.deleteUser(id)
      .then(res => this.loadUsers())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // email: "",
  // first_name: "",
  // last_name: "",
  // home_id: null,
  // work_id: null,
  // school_id: null,
  // password: ""

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      API.saveUser({
        email: this.state.email,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        home_id: this.state.home_id,
        work_id: this.state.work_id,
        school_id: this.state.school_id,
        password: this.state.password
      })
        .then(res => this.loadUsers())
        .catch(err => console.log(err));
    }
  };

  render() {
    // console.log("The render method just got fired. At this point, the state has: " + this.state.users.length + " users.");
    return (
      <Container fluid>
        <Row>
        <Col size="md-6 sm-12">
              <h1>Existing Users:</h1>
            {this.state.users.length ? (
              <List>
                {this.state.users.map(user => (
                  <ListItem key={user.id}>
                    <Link to={"/users/" + user.id}>
                      <strong>
                        {user.email} {user.first_name}
                      </strong>
                    </Link>

                    <DeleteBtn onClick={() => this.deleteUser(user.id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
          <Col size="md-6">
            <h1>User to add:</h1>
            <form>
              <Input
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="email address"
              />
              <Input
                value={this.state.first_name}
                onChange={this.handleInputChange}
                name="first_name"
                placeholder="First Name"
              />
              <Input
                value={this.state.last_name}
                onChange={this.handleInputChange}
                name="last_name"
                placeholder="Last Name"
              />
              {/* <Input
                value={this.state.last_name}
                onChange={this.handleInputChange}
                name="last_name"
                placeholder="Last Name"
              /> */}
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
                Submit User
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UsersEdit;
