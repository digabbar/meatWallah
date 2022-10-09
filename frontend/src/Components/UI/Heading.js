import React from "react";
import classes from "./Heading.module.css";
const Heading = (props) => {
  return <h1 className={classes.heading}>{props.name}</h1>;
};

export default Heading;
