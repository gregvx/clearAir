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

  loadLocations = () => {
    //load locationView component/page
    window.location.assign("/locations");
  //this opens in a new tab (believe that is what the owner of the question wanted if not you can do
  // window.location.href = "/insert/your/path/here".
  };

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
      API.editLocation(this.state.id, {
        // title: this.state.title,
        // author: this.state.author,
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
                Save
              </FormBtn>
            </form>
          </Col>
        </Row>
        {/* <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Synopsis</h1>
              <p>
                {this.state.book.synopsis}
              </p>
            </article>
          </Col>
        </Row> */}
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
