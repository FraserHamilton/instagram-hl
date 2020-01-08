import React, { useState } from "react";
import "./App.css";
import instaData from "./Data/instaDataFinal.json";
import InstaDisplay from "./InstaDisplay.js";
import GameOver from "./GameOver";
import StartScreen from "./StartScreen";
import styled from "styled-components";

const Game = ({ className }) => {
  const convertToRoundedMillions = number => {
    let rounded = (number * 0.000001).toFixed(2);
    return rounded;
  };

  const instagramData = instaData.slice(0, 249);

  const getNewInsta = () => {
    const newInsta = {
      ...instagramData[Math.floor(Math.random() * instagramData.length)]
    };
    newInsta.followers = convertToRoundedMillions(newInsta.followers);
    return newInsta;
  };

  const [givenInsta, setGivenInsta] = useState(getNewInsta());

  const [hiddenInsta, setHiddenInsta] = useState(getNewInsta());

  const [gameStage, setGameStage] = useState(1);

  const [score, setScore] = useState(0);

  const calculateAnswer = () => {
    if (hiddenInsta.followers === givenInsta.followers) {
      return "same";
    } else if (hiddenInsta.followers > givenInsta.followers) {
      return "higher";
    } else {
      return "lower";
    }
  };

  const startNewRound = () => {
    setGivenInsta(hiddenInsta);
    setHiddenInsta(getNewInsta());
  };

  const startNewGame = () => {
    setGivenInsta(getNewInsta());
    setHiddenInsta(getNewInsta());
    setScore(0);
    setGameStage(2);
  };

  const gameOver = () => {
    setGameStage(3);
  };

  const guessClick = guess => {
    const highOrLow = calculateAnswer();

    const isCorrect = highOrLow === guess;

    if (isCorrect) {
      setScore(score + 1);
      startNewRound();
    } else {
      gameOver();
    }
  };

  if (gameStage === 1) {
    return <StartScreen startFunc={startNewGame}></StartScreen>;
  } else if (gameStage === 2) {
    return (
      <div className={className}>
        <h1>Score: {score}</h1>
        <InstaDisplay insta={givenInsta}></InstaDisplay>
        <div id="versus">
          <h1>VS</h1>
        </div>
        <InstaDisplay
          clickFunction={guessClick}
          hidden
          insta={hiddenInsta}
          secondInsta={givenInsta.name}
        ></InstaDisplay>
      </div>
    );
  } else {
    return <GameOver score={score} restartFunc={startNewGame}></GameOver>;
  }
};

const StyledGame = styled(Game)`
  #versus {
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff989;
  }
`;

export default StyledGame;
