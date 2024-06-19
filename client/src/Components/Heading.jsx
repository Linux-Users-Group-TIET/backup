import React from "react";
import "./Heading.css"; // Import CSS file for styling

const Heading = ({ text }) => {
  return (
    <div className="heading-container">
      <h1 className="main-heading">{text}</h1>
      <div className="underline"></div>
    </div>
  );
};

export default Heading;
