import React, { Component } from "react";
// import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";

class UsersView extends Component {
  state = {
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

  }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


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
    return (
      <Container fluid>
        <Row>
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

export default UsersView;
