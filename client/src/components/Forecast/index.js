import React from "react";
import "./style.css";

// This file exports the Input, TextArea, and FormBtn components

export function Forecast(props) {
  // console.log("we are in the forecast component now, trying to generate a ui element with the following props:");
  // console.log(props);
  return (
    <div>
      <hr></hr>  
      <h4 className="countyHeader">PM 2.5 pollution forecast for {props.county}:</h4>
      {props.forecast.map(day => (
        <h4 className="forecasts" key={day.day}>&emsp;&emsp;&emsp;&emsp;{day.day}: {day.quality}</h4>
      ))}
    </div>
  );
}

