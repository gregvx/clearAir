import React from "react";
import "./style.css";

// This file exports the Input, TextArea, and FormBtn components

// function isChecked()
// {
//   var checkBoxContainer = document.getElementsByTagName("input")[0].getAttribute("type");

//   checkBoxContainer.addEventListener("change", function(){

//       if(this.checked === true)
//       {
//         this.value = 1;
//       }else{
//         this.value = 0;
//       }
//   })
// }

export function Input(props) {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
  );
}

export function CheckboxInput(props) {
  if (props.checked === 1) {
    return (
      <div className="form-group">
        <input className="form-control checkbox" id={props.id} name={props.name} type={props.type} defaultChecked="true" value={props.value} onChange={props.onChange} />
        <label className="checkbox-label" htmlFor={props.id}>{props.label}</label>
      </div>
    )
  }
  else {
    return (
      <div className="form-group">
        <input className="form-control checkbox" id={props.id} name={props.name} type={props.type} value={props.value} onChange={props.onChange} />
        <label className="checkbox-label" htmlFor={props.id}>{props.label}</label>
      </div>
    )
  }
}

//props.selcted    corresponds to the location.id that should be default selcted
export function Select(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <select className="form-control" id={props.id} name={props.name} onChange={props.onChange}>
        <option value="null">N/A</option>
        {props.options.map(location => {
          if (location.id === props.selected) {
            return (<option selected="selected" key={location.id} value={location.id}>{location.location_name}</option>)
          }
          else {
            return (<option key={location.id} value={location.id}>{location.location_name}</option>)
          }
        })}
      </select>

    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="20" {...props} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-success">
      {props.children}
    </button>
  );
}
