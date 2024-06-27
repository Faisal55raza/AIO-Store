import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loading">
      <div></div>
      <h1 className="Heading">Please wait for atleast 20s <br /> as this is hosted on free service</h1>
    </div>
  );
};

export default Loader;
