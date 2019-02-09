import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Locations extends Component {
  state = {
    locations: [],
    location_name: ""
    // author: "",
    // synopsis: ""
  };

  componentDidMount() {
    this.loadLocations();
  }

  loadLocations = () => {
    API.getLocations()
      .then(res =>
        this.setState({ location: res.data, location_name: "" })
      )
      .catch(err => console.log(err));
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
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Locations Should I Read?</h1>
            </Jumbotron>
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
                Submit Locations
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Locations On My List</h1>
            </Jumbotron>
            {/* {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )} */}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Locations;
