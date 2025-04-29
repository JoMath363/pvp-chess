import React from "react";
import "./Loader.css"

const Loader = () => {
  return (
    <div>
      <div className="overlay" id="overlay" />
      <div className="loader">
        <div className="loader-cube">
          <div className="face" />
          <div className="face" />
          <div className="face" />
          <div className="face" />
          <div className="face" />
          <div className="face" />
        </div>
      </div>
    </div>
  );
}

export default Loader;
