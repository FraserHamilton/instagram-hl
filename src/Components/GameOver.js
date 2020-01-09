import React from "react";
import "./App.css";
import styled from "styled-components";
import Button from "./Button.js";

const GameOver = ({ score, restartFunc, className }) => {
  const setNewHighScore = highScore => {
    localStorage.setItem("highScore", highScore);
  };

  const getHighScore = () => {
    var highScore = localStorage.getItem("highScore");

    if (score > highScore || highScore === "undefined") {
      setNewHighScore(score);

      return score;
    }

    return highScore;
  };

  return (
    <div className={className}>
      <div>
        <h1>Game Over</h1>
        <h3>Your Score This Time Was: {score}</h3>
        <h3>High Score: {getHighScore()}</h3>
        <Button text={"Play Again"} onClick={restartFunc}></Button>
      </div>
    </div>
  );
};

const StyledGameOver = styled(GameOver)`
  h1 {
    color: #fff989;
    font-size: 3em;
  }
  button {
    margin-top: 50px;
  }
`;

export default StyledGameOver;
