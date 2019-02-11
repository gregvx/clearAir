import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Forecast(props) {
  // console.log("we are in the forecast component now, trying to generate a ui element with the following props:");
  // console.log(props);
  return (
    <div>    
      <h3>Forecast for {props.county}</h3>
      {props.forecast.map(day => (
        <h4 key={day.day}>{day.day} {day.quality}</h4>
      ))}
    </div>
  );
}

