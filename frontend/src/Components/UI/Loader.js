import React from "react";
import { Vortex } from "react-loader-spinner";
function Loader() {
  return (
    <div className="text-center">
      <Vortex
        visible={true}
        height="300"
        width="300"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={["red", "green", "blue", "yellow", "orange", "purple"]}
      />
    </div>
  );
}

export default Loader;
