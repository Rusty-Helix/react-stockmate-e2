import React from "react";
import commonLoader from "../assets/loader.gif";
function Loader() {
  return (
    <div className="loader">
      <img src={commonLoader} alt="loading" />
    </div>
  );
}

export default Loader;
