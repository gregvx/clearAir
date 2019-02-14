import React from "react";
import { Row } from "../Grid";
import "./style.css";

// This file exports the ActCard component

export function ActCard(props) {
    // console.log("we are in the actcard component now, trying to generate a ui element with the following props:");
    // console.log(props);
    return (
        <div className="list-group-item">
            <div className="">
                <Row>
                    <h4>
                        <a href={props.actLink}>
                            {props.actName}
                        </a>
                    </h4>
                </Row>
                <Row className="row">
                    <div className="col-md-3">
                        <a href={props.actLink}>
                            <img className="actCardImg" alt="links to a page of something to do outside" src={props.actImgHref}></img>
                        </a>
                    </div>
                    <div className="col-md-9">
                        <p className="summaryP">{props.actDesc}</p>
                    </div>
                </Row>
            </div>
        </div>
    );
}

export function CardList({ children }) {
    return (
        <div className="list-group">
            {children}
        </div>
    );
}