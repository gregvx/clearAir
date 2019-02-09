import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class LocationDetail extends Component {
  state = {
    location: {}
  };
  // When this component mounts, grab the location with the _id of this.props.match.params.id
  // e.g. localhost:3000/locations/3
  componentDidMount() {
    API.getLocation(this.props.match.params.id)
      .then(res => this.setState({ location: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.state.location.location_name}
              </h1>
            </Jumbotron>
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
            <Link to="/">← Back to Locations</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LocationDetail;
