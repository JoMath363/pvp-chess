import React from "react";
import "./Loader.css"

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader-row">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="loader-row">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="loader-row">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default Loader;
