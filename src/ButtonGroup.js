import React from "react";
import "./App.css";
import styled from "styled-components";

const ButtonGroup = ({ clickFunction, className }) => {
  return (
    <div className={className}>
      <button onClick={clickFunction} name="higher">
        Higher
      </button>
      <button onClick={clickFunction} name="lower">
        Lower
      </button>
    </div>
  );
};

const StyledButtonGroup = styled(ButtonGroup)`
  button {
    background-color: Transparent;
    border-radius: 999px;
    outline: none;
    width: 200px;
    height: 50px;
    border: white 3px solid;
    font-weight: bold;
    margin: 0 auto;
    margin-top: 10px;
    display: block;
    color: #fff989;
    cursor: pointer;
  }

  button:hover {
    background-color: white;
    color: black;
  }
`;

export default StyledButtonGroup;
