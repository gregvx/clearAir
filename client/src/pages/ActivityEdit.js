import React, { Component } from "react";
// import DeleteBtn from "../components/DeleteBtn";
// import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
import { Input, CheckboxInput, Select, TextArea, FormBtn } from "../components/Form";


class ActivitiesEdit extends Component {
  state = {
    //this holds a list of current locations. Needed to populate dropdown menus.
    locations: [],
    //this holds the data for the existing activity to values
    id: 0,
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
      smog_county: null,
      //this holds the data for the new activity to values
      new_act_name: "",
      new_act_desc: "",
      new_act_href: "",
      new_act_img_href: "",
      new_jan_avail: 0,
      new_feb_avail: 0,
      new_mar_avail: 0,
      new_apr_avail: 0,
      new_may_avail: 0,
      new_jun_avail: 0,
      new_jul_avail: 0,
      new_aug_avail: 0,
      new_sep_avail: 0,
      new_oct_avail: 0,
      new_nov_avail: 0,
      new_dec_avail: 0,
      new_latitude: 0.0000,
      new_longitude: 0.0000,
      new_smog_county: null
  };

  // When this component mounts, grab the activity with the _id of this.props.match.params.id
  // e.g. localhost:3000/activities/3
  componentDidMount() {
    // console.log("componentdidmount method just fired of ActivityEdit");
    this.loadLocations();
    API.getActivity(this.props.match.params.id)
      .then(res => this.setState({
          id: res.data[0].id,
          act_name: res.data[0].act_name,
          act_desc: res.data[0].act_desc,
          act_href: res.data[0].act_href,
          act_img_href: res.data[0].act_img_href,
          jan_avail: res.data[0].jan_avail,
          feb_avail: res.data[0].feb_avail,
          apr_avail: res.data[0].apr_avail,
          mar_avail: res.data[0].mar_avail,
          may_avail: res.data[0].may_avail,
          jun_avail: res.data[0].jun_avail,
          jul_avail: res.data[0].jul_avail,
          aug_avail: res.data[0].aug_avail,
          sep_avail: res.data[0].sep_avail,
          oct_avail: res.data[0].oct_avail,
          nov_avail: res.data[0].nov_avail,
          dec_avail: res.data[0].dec_avail,
          latitude: res.data[0].latitude,
          longitude: res.data[0].longitude,
          smog_county: res.data[0].smog_county,
          new_act_name: res.data[0].act_name,
          new_act_desc: res.data[0].act_desc,
          new_act_href: res.data[0].act_href,
          new_act_img_href: res.data[0].act_img_href,
          new_jan_avail: res.data[0].jan_avail,
          new_feb_avail: res.data[0].feb_avail,
          new_apr_avail: res.data[0].apr_avail,
          new_mar_avail: res.data[0].mar_avail,
          new_may_avail: res.data[0].may_avail,
          new_jun_avail: res.data[0].jun_avail,
          new_jul_avail: res.data[0].jul_avail,
          new_aug_avail: res.data[0].aug_avail,
          new_sep_avail: res.data[0].sep_avail,
          new_oct_avail: res.data[0].oct_avail,
          new_nov_avail: res.data[0].nov_avail,
          new_dec_avail: res.data[0].dec_avail,
          new_latitude: res.data[0].latitude,
          new_longitude: res.data[0].longitude,
          new_smog_county: res.data[0].smog_county
        }))
      .catch(err => console.log(err));
  }

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

  loadActivities = () => {
    //load activityView component/page after done with edit
    console.log("The view method loadActivitiies just fired.");
    window.location.assign("/activities");
  };

  deleteActivity = id => {
    API.deleteActivity(id)
      .then(res => this.loadActivity())
      .catch(err => console.log(err));
  };

  

  handleInputChange = event => {
    const { name, value } = event.target;
    //check if the item event was a checkbox, change false and true to 0 and 1
    console.log(event.target);
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
    console.log("you changed a field. the field " + name + " was changed to " + value + ". the state is now:");
    console.log(this.state)
  };
  

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.act_href && this.state.act_img_href && this.state.act_desc && this.state.latitude && this.state.longitude) {
      API.editActivity2(this.state.id, {
        act_name: this.state.new_act_name,
        act_desc: this.state.new_act_desc,
        act_href: this.state.new_act_href,
        act_img_href: this.state.new_act_img_href,
        jan_avail: this.state.new_jan_avail,
        feb_avail: this.state.new_feb_avail,
        apr_avail: this.state.new_apr_avail,
        mar_avail: this.state.new_mar_avail,
        may_avail: this.state.new_may_avail,
        jun_avail: this.state.new_jun_avail,
        jul_avail: this.state.new_jul_avail,
        aug_avail: this.state.new_aug_avail,
        sep_avail: this.state.new_sep_avail,
        oct_avail: this.state.new_oct_avail,
        nov_avail: this.state.new_nov_avail,
        dec_avail: this.state.new_dec_avail,
        latitude: this.state.new_latitude,
        longitude: this.state.new_longitude,
        smog_county: this.state.new_smog_county
      })
        .then(res => this.loadActivities())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
        <Col size="md-12">
              <h1>
                {this.state.act_name}
              </h1>
          </Col>

          <Col size="md-6">
            <h1>Activity to view/edit:</h1>
            <form>
              <Input
                value={this.state.new_act_name}
                onChange={this.handleInputChange}
                name="new_act_name"
                placeholder="activity name"
              />
              <TextArea
                value={this.state.new_act_desc}
                onChange={this.handleInputChange}
                name="new_act_desc"
                placeholder="Description..."
              />
              <Input
                value={this.state.new_act_href}
                onChange={this.handleInputChange}
                name="new_act_href"
                placeholder="external link"
              />
              <Input
                value={this.state.new_act_img_href}
                onChange={this.handleInputChange}
                name="new_act_img_href"
                placeholder="external image link"
              />
              <CheckboxInput
                id="new_jan_avail"
                label="Can be done in January"
                checked={this.state.new_jan_avail}
                type="checkbox"
                onChange={this.handleInputChange}
                name="new_jan_avail"
              />
              <CheckboxInput
                id="new_feb_avail"
                label="Can be done in February"
                checked={this.state.new_feb_avail}
                type="checkbox"
                onChange={this.handleInputChange}
                name="new_feb_avail"
              />
              <CheckboxInput
                id="new_mar_avail"
                label="Can be done in March"
                checked={this.state.new_mar_avail}
                type="checkbox"
                onChange={this.handleInputChange}
                name="new_mar_avail"
              />
              <CheckboxInput
                id="new_apr_avail"
                label="Can be done in April"
                checked={this.state.new_apr_avail}
                type="checkbox"
                onChange={this.handleInputChange}
                name="new_apr_avail"
              />
              <CheckboxInput
                id="new_may_avail"
                label="Can be done in May"
                checked={this.state.new_may_avail}
                type="checkbox"
                onChange={this.handleInputChange}
                name="new_may_avail"
              />
              <CheckboxInput
                id="new_jun_avail"
                label="Can be done in June"
                checked={this.state.new_jun_avail}
                type="checkbox"
                onChange={this.handleInputChange}
                name="new_jun_avail"
              />
              <CheckboxInput
                id="new_jul_avail"
                label="Can be done in July"
                checked={this.state.new_jul_avail}
                type="checkbox"
                onChange={this.handleInputChange}
                name="new_jul_avail"
              />
              <CheckboxInput
                id="new_aug_avail"
                label="Can be done in August"
                checked={this.state.new_aug_avail}
                type="checkbox"
                onChange={this.handleInputChange}
                name="new_aug_avail"
              />
              <CheckboxInput
                id="new_sep_avail"
                label="Can be done in September"
                checked={this.state.new_sep_avail}
                type="checkbox"
                onChange={this.handleInputChange}
                name="new_sep_avail"
              />
              <CheckboxInput
                id="new_oct_avail"
                label="Can be done in October"
                checked={this.state.new_oct_avail}
                type="checkbox"
                onChange={this.handleInputChange}
                name="new_oct_avail"
              />
              <CheckboxInput
                id="new_nov_avail"
                label="Can be done in November"
                checked={this.state.new_nov_avail}
                type="checkbox"
                onChange={this.handleInputChange}
                name="new_nov_avail"
              />
              <CheckboxInput
                id="new_dec_avail"
                label="Can be done in December"
                checked={this.state.new_dec_avail}
                type="checkbox"
                onChange={this.handleInputChange}
                name="new_dec_avail"
              />
              <Input
                value={this.state.new_latitude}
                onChange={this.handleInputChange}
                name="new_latitude"
                placeholder="40.0000"
              />
              <Input
                value={this.state.new_longitude}
                onChange={this.handleInputChange}
                name="new_longitude"
                placeholder="-111.0000"
              />
              <Select
                id="smog_county_select"
                label="Area where smog settles (N/A if in mountains away from county smog)"
                options={this.state.locations}
                selected={this.state.smog_county}
                onChange={this.handleInputChange}
                name="new_smog_county"
              />
              <FormBtn
                disabled={!(this.state.new_act_href && this.state.new_act_img_href && this.state.new_act_desc && this.state.new_latitude && this.state.new_longitude)}
                onClick={this.handleFormSubmit}
              >
                Save
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/activities">← Back to Activities</Link>
          </Col>
        </Row>
      </Container>
    );
    
  }
}

export default ActivitiesEdit;
