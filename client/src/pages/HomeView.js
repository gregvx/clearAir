import React, { Component } from "react";
import { Container } from "../components/Grid";
import API from "../utils/API";
// import { List, ListItem } from "../components/List";
import { List } from "../components/List";
import { Forecast } from "../components/Forecast";


class HomeView extends Component {
  // super(state)
  state = {
    slc_name: "Salt Lake Valley",
    slc_href: "https://air.utah.gov/forecast.php?id=slc",
    slc_forecast: [],
    utah_name: "Provo/Orem",
    utah_href: "https://air.utah.gov/forecast.php?id=ln",
    utah_forecast: [],
    davis_name: "Davis County",
    davis_href: "https://air.utah.gov/forecast.php?id=bv",
    davis_forecast: [],
    cache_name: "Logan/Clearfield",
    cache_href: "https://air.utah.gov/forecast.php?id=sm",
    cache_forecast: []
  };
  componentDidMount() {
    this.loadDeqData();
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

      //third do cache
    var url_c = { href: this.state.cache_href };
    API.getDeqData(url_c)
      .then(res => {
        this.setState({ cache_forecast: res.data });
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

  };

printState = function () {
  console.log("Just fired render method. Here is what state is looking like:");
  console.log(this.state);
}


  render() {
    // this.printState()
    return (
      <Container fluid>
        <h1>This is the home view</h1>
          <List>
              <Forecast forecast = {this.state.slc_forecast} county = {this.state.slc_name}>
              </Forecast>
          </List>
          <List>
              <Forecast forecast = {this.state.utah_forecast} county = {this.state.utah_name}>
              </Forecast>
          </List>
          <List>
              <Forecast forecast = {this.state.davis_forecast} county = {this.state.davis_name}>
              </Forecast>
          </List>
          <List>
              <Forecast forecast = {this.state.cache_forecast} county = {this.state.cache_name}>
              </Forecast>
          </List>
      </Container>
    )
  }
}

export default HomeView;
