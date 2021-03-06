import React from "react";
import "./style.css";

// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    // <div className="list-overflow-container">
    <div>
      <ul className="list-group">{children}</ul>
    </div>
  );
}

export function ListItem({ children }) {
  return <li className="list-group-item">{children}</li>;
}

export function CardList({ children }) {
  return (
    <div className="list-group">
      {children}
    </div>
  );
}

export function ForecastList({ children }) {
  return (
    <div className="list-group">
      {children}
    </div>
  );
}
