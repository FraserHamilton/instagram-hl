import React from "react";
import "./App.css";
import styled from "styled-components";

const Button = ({ onClick, text, className }) => {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};

const StyledButton = styled(Button)`
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

  :hover {
    background-color: white;
    color: black;
  }
`;

export default StyledButton;
