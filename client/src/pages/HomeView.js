import React, { Component } from "react";
// import { Container } from "../components/Grid";
import API from "../utils/API";
// import { List, ListItem } from "../components/List";
import { List, ForecastList } from "../components/List";
import { Forecast } from "../components/Forecast";
import { ActCard } from "../components/ActCard";
import { ColStandard, RowStandard, Container } from "../components/Grid"
import Jumbotron from "../components/Jumbotron";;


class HomeView extends Component {
  // super(state)
  state = {
    //this holds a list of current activities
    activities: [],
    //store the time here that the user loaded this data
    current_date: 1,
    current_month: 1,
    //here are wasatch front county forcast stuff
    slc_name: "Salt Lake Valley",
    slc_href: "https://air.utah.gov/forecast.php?id=slc",
    slc_forecast: [],
    utah_name: "Provo/Orem",
    utah_href: "https://air.utah.gov/forecast.php?id=ln",
    utah_forecast: [],
    davis_name: "Davis County",
    davis_href: "https://air.utah.gov/forecast.php?id=bv",
    davis_forecast: [],
    ogden_name: "Ogden",
    ogden_href: "https://air.utah.gov/forecast.php?id=o2",
    ogden_forecast: [],
    cache_name: "Logan/Clearfield",
    cache_href: "https://air.utah.gov/forecast.php?id=sm",
    cache_forecast: []
  };
  componentDidMount() {
    this.loadDate();
    this.loadDeqData();
    this.loadActivities();
  }

  loadDeqData = function () {

    //first do slc
    var url = { href: this.state.slc_href };
    API.getDeqData(url)
      .then(res => {
        // console.log("the res data is");
        // console.log(res.data);
        this.setState({ slc_forecast: res.data });
        // console.log("now, the state should be dope.");
        // console.log(this.state.slc_forecast);
        return "1 done";
      })
      .catch(err => console.log(err));

    //second, do provo
    var url_p = { href: this.state.utah_href };
    API.getDeqData(url_p)
      .then(res => {
        // console.log("the res data is");
        // console.log(res.data);
        this.setState({ utah_forecast: res.data });
        // console.log("now, the state should be dope.");
        // console.log(this.state.slc_forecast);
        return "2 done";
      })
      .catch(err => console.log(err));

    //third do ogden
    var url_c = { href: this.state.ogden_href };
    API.getDeqData(url_c)
      .then(res => {
        this.setState({ ogden_forecast: res.data });
        return "3 done";
      })
      .catch(err => console.log(err));

    //fourth do davis
    var url_d = { href: this.state.davis_href };
    API.getDeqData(url_d)
      .then(res => {
        this.setState({ davis_forecast: res.data });
        return "4 done";
      })
      .catch(err => console.log(err));

    //fifth do cache
    var url_e = { href: this.state.cache_href };
    API.getDeqData(url_e)
      .then(res => {
        this.setState({ cache_forecast: res.data });
        return "5 done";
      })
      .catch(err => console.log(err));

  };

  loadActivities = () => {
    // console.log("Need to do an API call from ActivitiesView...");
    var month = this.state.current_month;
    API.getActivities()
      .then(res => {
        // console.log("the API call should be done. now use the returned json to set the state.");
        // console.log("At this point, the res.data has " + res.data.activities.length + " number of activities.");
        this.setState({ activities: res.data.activities });
      })
      .catch(err => console.log(err));
  };

  loadDate = () => {
    // console.log("Need to do an API call from HomeView for a date...");
    API.getDate()
      .then(res => {
        console.log("the API call should be done. now use the returned json to set the state.");
        console.log("At this point, the res.data is");
        console.log(res.data);
        this.setState({ current_date: res.data.fullDate });
        this.setState({ current_month: res.data.justMonth });
      })
      .catch(err => console.log(err));
  };

  printState = function () {
    console.log("Just fired render method. Here is what state is looking like:");
    console.log(this.state);
  }


  render() {
    // this.printState()
    return (
      <Container fluid>
        <RowStandard>
          <ColStandard>
            <Jumbotron>
              <h1>ClearAir</h1>
              <hr></hr>
              <h3>Outdoor Recreation Ideas on the Wasatch Front Where the Air is Clean, Now.</h3>
              <hr></hr>
              <h3>{this.state.current_date}</h3>
            </Jumbotron>
          </ColStandard>
        </RowStandard>
        <ForecastList>
          <Forecast forecast={this.state.slc_forecast} county={this.state.slc_name}>
          </Forecast>
          <Forecast forecast={this.state.utah_forecast} county={this.state.utah_name}>
          </Forecast>
          <Forecast forecast={this.state.davis_forecast} county={this.state.davis_name}>
          </Forecast>
          <Forecast forecast={this.state.ogden_forecast} county={this.state.ogden_name}>
          </Forecast>
          <Forecast forecast={this.state.cache_forecast} county={this.state.cache_name}>
          </Forecast>
        </ForecastList>
        <h1>Current ClearAir Places to Recreate</h1>
        {this.state.activities.length ? (
          <List>
            {this.state.activities.map(activity => (
              <ActCard key={activity.id} actName={activity.act_name} actImgHref={activity.act_img_href} actDesc={activity.act_desc} actLink={activity.act_href}>
                {/* <Link to={"/activities/" + activity.id}> */}
                {/* </Link> */}
              </ActCard>
            ))}
          </List>
        ) : (
            <h3>No Results to Display</h3>
          )}
      </Container>
    )
  }
}

export default HomeView;
