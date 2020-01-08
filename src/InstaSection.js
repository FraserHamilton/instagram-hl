import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";
import ButtonGroup from "./ButtonGroup.js";
import CountUp from "react-countup";

const InstaSection = ({
  hidden = false,
  insta,
  secondInsta,
  className,
  clickFunction
}) => {
  const [guessMade, setGuessMade] = useState(false);

  const nameless = e => {
    const guess = e.target.name;

    setGuessMade(true);
    setTimeout(() => {
      clickFunction(guess);
      setGuessMade(false);
    }, 3500);
  };

  return (
    <div className={className}>
      <img height="200px" src={insta.picture}></img>
      <h2>{insta.name}</h2>
      <p>Has</p>
      {hidden ? (
        !guessMade ? (
          <React.Fragment>
            <ButtonGroup clickFunction={nameless}></ButtonGroup>
            <p>Followers Than {secondInsta}</p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h1>
              <CountUp end={insta.followers} />M
            </h1>
            <p>Followers Than {secondInsta}</p>
          </React.Fragment>
        )
      ) : (
        <React.Fragment>
          <h1>{insta.followers}M</h1>
          <p>Followers</p>
        </React.Fragment>
      )}
    </div>
  );
};

const StyledInstaSection = styled(InstaSection)`
  display: inline-block;
  width: 500px;
  min-height: 500px;
  h1 {
    color: #fff989;
    min-height: 110px;
    line-height: 110px;
    white-space: nowrap;
    font-size: 3em;
    margin: 0;
  }
`;

export default StyledInstaSection;
