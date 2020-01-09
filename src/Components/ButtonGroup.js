import React from "react";
import Button from "./Button";

const ButtonGroup = ({ clickFunction, className }) => {
  return (
    <div className={className}>
      <Button onClick={clickFunction} name={"higher"} text={"Higher"}></Button>
      <Button onClick={clickFunction} name={"lower"} text={"Lower"}></Button>
    </div>
  );
};

export default ButtonGroup;
