import React from "react";
import "./App.css";
import styled from "styled-components";
import Button from "./Button.js";

const StartScreen = ({ startFunc, className }) => {
  return (
    <div className={className}>
      <div>
        <h1>Higher Or Lower</h1>
        <h2>Instagram Edition</h2>
        <h3>
          A frustratingly addictive game of higher or lower using the top
          Instagram follower counts. <br></br> The data is pulled daily to keep
          the counts as current as possible. <br></br>
        </h3>

        <Button text={"Play"} onClick={startFunc}></Button>
        <a href="http://www.higherlowergame.com/">
          Check out the original game that inspired this version
        </a>
      </div>
    </div>
  );
};

const StyledStartScreen = styled(StartScreen)`
  h1 {
    color: #fff989;
    font-size: 3em;
    margin-bottom: 0;
  }

  h2 {
    margin-top: 0;
  }

  button {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  a {
    color: #fff989;
  }

  a: hover {
    color: #ffffff;
  }
`;

export default StyledStartScreen;
