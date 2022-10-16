import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
function MetaData(props) {
  return (
    <Helmet>
      <title>{`${props.title}-meatWallah`}</title>
    </Helmet>
  );
}

export default MetaData;
