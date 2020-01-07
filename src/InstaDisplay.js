import React, { useState } from "react";
import "./App.css";

const InstaDisplay = props => {
  const instaToDisplay = props.insta;
  return (
    <div>
      <img height="200px" src={instaToDisplay.picture}></img>
      <h3>{instaToDisplay.followers}M</h3>
      <p>{instaToDisplay.name}</p>
      <p>@{instaToDisplay.instagram}</p>
    </div>
  );
};

export default InstaDisplay;
