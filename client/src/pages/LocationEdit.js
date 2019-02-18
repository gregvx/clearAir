import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
// import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Input, FormBtn } from "../components/Form";

class LocationEdit extends Component {
  state = {
    id: 0,
    location_name: "",
    new_location_name: ""
  };
  // When this component mounts, grab the location with the _id of this.props.match.params.id
  // e.g. localhost:3000/locations/3
  componentDidMount() {
    console.log("componentdidmount method just fired of locationEdit");
    API.getLocation(this.props.match.params.id)
      .then(res => this.setState({ id: res.data[0].id, location_name: res.data[0].location_name, new_location_name: res.data[0].location_name }))
      .catch(err => console.log(err));
  }

  //this method gets called after done editing a location. It just moves the view to the next logical place.
  loadLocations = () => {
    window.location.assign("/locations");
  };


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.location_name) {
      API.editLocation2(this.state.id, {
        location_name: this.state.new_location_name
      })
        .then(res => this.loadLocations())
        .catch(err => console.log(err));
    }
  };

  render() {
    console.log("About to render view. The location info in state is: " + this.state.location_name);
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
              <h1>
                {this.state.location_name}
              </h1>
          </Col>
          <Col size="md-6">
            <h1>Location to view/edit...</h1>
            <form>
              <Input
                value={this.state.new_location_name}
                onChange={this.handleInputChange}
                name="new_location_name"
                placeholder="Name of new area..."
              />
              <FormBtn
                disabled={!(this.state.location_name)}
                onClick={this.handleFormSubmit}
              >
                Save
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/locations">← Back to Locations</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LocationEdit;
