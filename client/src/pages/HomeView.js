import React, { Component } from "react";
import { Container } from "../components/Grid";
import API from "../utils/API";
import { List, ListItem } from "../components/List";


class HomeView extends Component {
  state = {
    slc: { forecast: [], name: "Salt Lake Valley", href: "https://air.utah.gov/forecast.php?id=slc" },
    utah: { forecast: [], name: "Provo/Orem", href: "https://air.utah.gov/forecast.php?id=ln" },
    davis: { forecast: [], name: "Davis County", href: "https://air.utah.gov/forecast.php?id=bv" },
    cache: { forecast: [], name: "Logan/Clearfield", href: "https://air.utah.gov/forecast.php?id=sm" },
  };
  componentDidMount() {
    this.loadDeqData();
  }

  loadDeqData = function () {
    for (let area in this.state) {
      // console.log("Need to do an API call from HomeView. Lets do ");
      // console.log(this.state[area]);
      API.getDeqData(this.state[area])
        .then(res => {
          // console.log("the API call should be done. now use the returned json to set the state for " + area);
          console.log(res.data);
          var dummyObject = {
            forecast: res.data,
            name: this.state.name,
            href: this.state.href
          }

          //these three lines of code works for the first object in the loop but not the next three
          this.setState({slc: dummyObject});
          console.log("array is now ");
          console.log(this.state.slc.forecast);

          //this code is what I think *should* work for all items in the loop but works for none.
          // this.setState({area: dummyObject});
          // console.log("array is now ");
          // console.log(this.state[area].forecast);
        })
        .catch(err => console.log(err));
    }
  };
  // this.areas.map(area => {
  //   console.log("Need to do an API call from HomeView...");
  //   API.getDeqData(area)
  //     .then(res => {
  //       console.log("the API call should be done. now use the returned json to set the state. Json was: ");
  //       console.log(res);
  //       this.setState({ slc: res.data });
  //     })
  //     .catch(err => console.log(err));
  // });


  render() {
    return (
      <Container fluid>
        <h1>This is the home view</h1>
        <h2>Forecast for Salt Lake Valley:</h2>
        {this.state.slc.forecast.length ? (
          <List>
            {this.state.slc.forecast.map(day => (
              <ListItem key={day.day}>
                <strong>
                  {day.day} {day.quality}
                </strong>
              </ListItem>
            ))}
          </List>
        ) : (
            <h3>No Results to Display</h3>
          )}
      </Container>
    );
  }
}

export default HomeView;
