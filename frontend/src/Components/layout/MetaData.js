import React from "react";
import { Helmet } from "react-helmet";
function MetaData(props) {
  return (
    <Helmet>
      <title>{`${props.title}}-meatWallah`}</title>
    </Helmet>
  );
}

export default MetaData;
