import React, { Component } from "react";
// import DeleteBtn from "../components/DeleteBtn";
// import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
import { Input, Select, FormBtn } from "../components/Form";

class UsersEdit extends Component {
  state = {
    //this holds a list of current locations. Needed to populate dropdown menus.
    locations: [],
    //this holds the existing data for the user
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    home_id: null,
    work_id: null,
    school_id: null,
    password: "",
    //this holds the new data for the user
    new_email: "",
    new_first_name: "",
    new_last_name: "",
    new_home_id: null,
    new_work_id: null,
    new_school_id: null
  };

  // When this component mounts, grab the user with the _id of this.props.match.params.id
  // e.g. localhost:3000/users/3
  componentDidMount() {
    // console.log("componentdidmount method just fired of userEdit");
    this.loadLocations();
    API.getUser(this.props.match.params.id)
      .then(res => this.setState({ 
        id: res.data[0].id, 
        email: res.data[0].email, new_email: res.data[0].email,
        first_name: res.data[0].first_name, new_first_name: res.data[0].first_name,
        last_name: res.data[0].last_name, new_last_name: res.data[0].last_name,
        home_id: res.data[0].home_id, new_home_id: res.data[0].home_id,
        work_id: res.data[0].work_id, new_work_id: res.data[0].work_id,
        school_id: res.data[0].school_id, new_school_id: res.data[0].school_id
       }))
      .catch(err => console.log(err));
  };

  loadLocations = () => {
    // console.log("Need to do an API call from UserView for locations...");
    API.getLocations()
      .then(res => {
        // console.log("the API call should be done. now use the returned json to set the state.");
        // console.log("At this point, the res.data has " + res.data.locations.length + " number of locations.");
        this.setState({ locations: res.data.locations });
      })
      .catch(err => console.log(err));
  };

  //this method gets called after done editing a user. It just moves the view to the next logical place.
  loadUsers = () => {
    window.location.assign("/users");
  };


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.email) {
      API.editUser2(this.state.id, {
        email: this.state.new_email,
        first_name: this.state.new_first_name,
        last_name: this.state.new_last_name,
        home_id: this.state.new_home_id,
        work_id: this.state.new_work_id,
        school_id: this.state.new_school_id,
      })
        .then(res => this.loadUsers())
        .catch(err => console.log(err));
    }
  };


  render() {
    // console.log("About to render view. The user email in state is: " + this.state.email + "and the the total state is:");
    // console.log(this.state);
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <h1>User to view/edit:</h1>
            <form>
              <Input
                value={this.state.new_email}
                onChange={this.handleInputChange}
                name="new_email"
                placeholder="email address"
              />
              <Input
                value={this.state.new_first_name}
                onChange={this.handleInputChange}
                name="new_first_name"
                placeholder="First Name"
              />
              <Input
                value={this.state.new_last_name}
                onChange={this.handleInputChange}
                name="new_last_name"
                placeholder="Last Name"
              />
              <Select
                id="home_id_select"
                label="Area where user lives"
                options={this.state.locations}
                selected={this.state.new_home_id}
                onChange={this.handleInputChange}
                name="new_home_id"
              />
              <Select
                id="work_id_select"
                label="Area where user works"
                options={this.state.locations}
                selected={this.state.new_work_id}
                onChange={this.handleInputChange}
                name="new_work_id"
              />
              <Select
                id="school_id_select"
                label="Area where user attends school"
                options={this.state.locations}
                selected={this.state.new_school_id}
                onChange={this.handleInputChange}
                name="new_school_id"
              />
              <FormBtn
                disabled={!(this.state.email)}
                onClick={this.handleFormSubmit}
              >
                Save
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
        <Col size="md-2">
          <Link to="/users">← Back to Users</Link>
        </Col>
      </Row>
      </Container>
    );
  }
}

export default UsersEdit;
