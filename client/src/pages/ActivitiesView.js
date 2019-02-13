import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
// import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, CheckboxInput, Select, TextArea, FormBtn } from "../components/Form";

class ActivitiesView extends Component {
  state = {
    //this holds a list of current activities
    activities: [],
    //this holds a list of current locations. Needed to populate dropdown menus.
    locations: [],
    //this holds the data for a new activity to create
    act_name: "",
      act_desc: "",
      act_href: "",
      act_img_href: "",
      jan_avail: 0,
      feb_avail: 0,
      mar_avail: 0,
      apr_avail: 0,
      may_avail: 0,
      jun_avail: 0,
      jul_avail: 0,
      aug_avail: 0,
      sep_avail: 0,
      oct_avail: 0,
      nov_avail: 0,
      dec_avail: 0,
      latitude: 0.0000,
      longitude: 0.0000,
      smog_county: null
  };

  componentDidMount() {
    this.loadActivities();
    this.loadLocations();
  }

  loadActivities = () => {
    // console.log("Need to do an API call from ActivitiesView...");
    API.getActivities()
      .then(res => {
        // console.log("the API call should be done. now use the returned json to set the state.");
        // console.log("At this point, the res.data has " + res.data.activities.length + " number of activities.");
        this.setState({ activities: res.data.activities });
      })
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

  deleteActivity = id => {
    API.deleteActivity(id)
      .then(res => this.loadActivity())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    //check if the item event was a checkbox, change no and yes to 0 and 1
    // console.log(event.target);
    // console.log(event.target.checked);

    if(event.target.type === "checkbox") {
      if(event.target.checked) {
        this.setState({
          [name]: 1
        });
      }
      else {
        this.setState({
          [name]: 0
        });
      }
    }
    else {
      this.setState({
        [name]: value
      });
    }

    // console.log("you changed a field. the field " + name + " was changed to " + value);
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("jan:" + this.state.jan_avail);
    console.log("feb:" + this.state.feb_avail);
    console.log("mar:" + this.state.mar_avail);
    console.log("apr:" + this.state.apr_avail);
    console.log("dec:" + this.state.dec_avail);
    if (this.state.act_href && this.state.act_img_href && this.state.act_desc && this.state.latitude && this.state.longitude) {
      API.saveActivity({
        act_name: this.state.act_name,
        act_desc: this.state.act_desc,
        act_href: this.state.act_href,
        act_img_href: this.state.act_img_href,
        jan_avail: this.state.jan_avail,
        // feb_avail: this.state.feb_avail === null ? 0 : this.state.feb_avail,
        feb_avail: this.state.feb_avail,
        apr_avail: this.state.apr_avail,
        mar_avail: this.state.mar_avail,
        may_avail: this.state.may_avail,
        jun_avail: this.state.jun_avail,
        jul_avail: this.state.jul_avail,
        aug_avail: this.state.aug_avail,
        sep_avail: this.state.sep_avail,
        oct_avail: this.state.oct_avail,
        nov_avail: this.state.nov_avail,
        dec_avail: this.state.dec_avail,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        smog_county: this.state.smog_county
      })
        .then(res => this.loadActivities())
        .catch(err => console.log(err));
    }
  };

  render() {
    // console.log("The render method just got fired. At this point, the state has: " + this.state.activities.length + " activities.");
    return (
      <Container fluid>
        <Row>
        <Col size="md-6 sm-12">
              <h1>Existing Activities:</h1>
            {this.state.activities.length ? (
              <List>
                {this.state.activities.map(activity => (
                  <ListItem key={activity.id}>
                    <Link to={"/activities/" + activity.id}>
                      <strong>
                        {activity.act_name}
                      </strong>
                    </Link>

                    <DeleteBtn onClick={() => this.deleteActivity(activity.id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
          <Col size="md-6">
            <h1>Activity to add:</h1>
            <form>
              <Input
                value={this.state.act_name}
                onChange={this.handleInputChange}
                name="act_name"
                placeholder="activity name"
              />
              <TextArea
                value={this.state.act_desc}
                onChange={this.handleInputChange}
                name="act_desc"
                placeholder="Description..."
              />
              <Input
                value={this.state.act_href}
                onChange={this.handleInputChange}
                name="act_href"
                placeholder="external link"
              />
              <Input
                value={this.state.act_img_href}
                onChange={this.handleInputChange}
                name="act_img_href"
                placeholder="external image link"
              />
              <CheckboxInput
                id="jan_avail"
                label="Can be done in January"
                type="checkbox"
                onChange={this.handleInputChange}
                name="jan_avail"
              />
              <CheckboxInput
                id="feb_avail"
                label="Can be done in February"
                type="checkbox"
                onChange={this.handleInputChange}
                name="feb_avail"
              />
              <CheckboxInput
                id="mar_avail"
                label="Can be done in March"
                type="checkbox"

                onChange={this.handleInputChange}
                name="mar_avail"
              />
              <CheckboxInput
                id="apr_avail"
                label="Can be done in April"
                type="checkbox"
                onChange={this.handleInputChange}
                name="apr_avail"
              />
              <CheckboxInput
                id="may_avail"
                label="Can be done in May"
                type="checkbox"
                onChange={this.handleInputChange}
                name="may_avail"
              />
              <CheckboxInput
                id="jun_avail"
                label="Can be done in June"
                type="checkbox"
                onChange={this.handleInputChange}
                name="jun_avail"
              />
              <CheckboxInput
                id="jul_avail"
                label="Can be done in July"
                type="checkbox"
                onChange={this.handleInputChange}
                name="jul_avail"
              />
              <CheckboxInput
                id="aug_avail"
                label="Can be done in August"
                type="checkbox"
                onChange={this.handleInputChange}
                name="aug_avail"
              />
              <CheckboxInput
                id="sep_avail"
                label="Can be done in September"
                type="checkbox"
                onChange={this.handleInputChange}
                name="sep_avail"
              />
              <CheckboxInput
                id="oct_avail"
                label="Can be done in October"
                type="checkbox"
                onChange={this.handleInputChange}
                name="oct_avail"
              />
              <CheckboxInput
                id="nov_avail"
                label="Can be done in November"
                type="checkbox"
                onChange={this.handleInputChange}
                name="nov_avail"
              />
              <CheckboxInput
                id="dec_avail"
                label="Can be done in December"
                type="checkbox"
                onChange={this.handleInputChange}
                name="dec_avail"
              />
              <Input
                value={this.state.latitude}
                onChange={this.handleInputChange}
                name="latitude"
                placeholder="40.0000"
              />
              <Input
                value={this.state.longitude}
                onChange={this.handleInputChange}
                name="longitude"
                placeholder="-111.0000"
              />
              <Select
                id="smog_county_select"
                label="Area where smog settles (N/A if in mountains away from county smog)"
                options={this.state.locations}
                onChange={this.handleInputChange}
                name="smog_county"
              />
              <FormBtn
                disabled={!(this.state.act_href && this.state.act_img_href && this.state.act_desc && this.state.latitude && this.state.longitude)}
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

export default ActivitiesView;