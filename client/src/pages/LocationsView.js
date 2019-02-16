import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
// import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class LocationsView extends Component {
  state = {
    locations: [],
    location_name: ""
  };

  componentDidMount() {
    this.loadLocations();
  }

  loadLocations = () => {
    API.getLocations()
      .then(res => {
        // console.log("the API call should be done. now use the returned json to set the state.");
        // console.log("At this point, the res.data has locations of: " + res.data.locations.length);
        this.setState({ locations: res.data.locations, location_name: "" });
      })
      .catch(err => console.log(err));
  };

  // loadLocations = () => {
  //   API.getLocations()
  //     .then(res => {
  //       var that = this;
  //       function step1 (step2) {
  //         //define code to do first:
  //         that.setState({ locations: res.data, location_name: "" });
  //         step2();
  //       };
  //       function step2() {
  //         //define second line of code:
  //         console.log("The backend just sent back locations. The state is now set. Number of locations was: " + that.state.locations.length);
  //       };
  //       step1(step2);
  //     })
  //     .catch(err => console.log(err));
  // };

  deleteLocation = id => {
    API.deleteLocation(id)
      .then(res => this.loadLocations())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    // if (this.state.title && this.state.author) {
    if (this.state.location_name) {
      API.saveLocation({
        // title: this.state.title,
        // author: this.state.author,
        location_name: this.state.location_name
      })
        .then(res => this.loadLocations())
        .catch(err => console.log(err));
    }
  };

  render() {
    // console.log("The render method just got fired. At this point, the state has locations of: " + this.state.locations.length);
    return (
      <Container fluid>
        <Row>
        <Col size="md-6 sm-12">
              <h1>Existing Locations:</h1>
            {this.state.locations.length ? (
              <List>
                {this.state.locations.map(location => (
                  <ListItem key={location.id}>
                    <Link to={"/locations/" + location.id}>
                      <strong>
                        {location.location_name}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteLocation(location.id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
          <Col size="md-6">
            <h1>Location to add:</h1>
            <form>
              <Input
                value={this.state.location_name}
                onChange={this.handleInputChange}
                name="location_name"
                placeholder="Name of new area..."
              />
              {/* <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              /> */}
              <FormBtn
                // disabled={!(this.state.author && this.state.title)}
                disabled={!(this.state.location_name)}
                onClick={this.handleFormSubmit}
              >
                Submit Location
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LocationsView;
