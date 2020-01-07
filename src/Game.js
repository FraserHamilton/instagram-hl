import React, { useState } from "react";
import "./App.css";
import instaData from "./instaDataFinal.json";
import InstaDisplay from "./InstaDisplay.js";

const Game = () => {
  const convertToRoundedMillions = number => {
    return (number * 0.000001).toFixed(2);
  };

  const instagramData = instaData.slice(0, 249);

  const getNewInsta = () => {
    const newInsta =
      instagramData[Math.floor(Math.random() * instagramData.length)];
    newInsta.followers = convertToRoundedMillions(newInsta.followers);
    return newInsta;
  };

  const [givenInsta, setGivenInsta] = useState(getNewInsta());

  const [hiddenInsta, setHiddenInsta] = useState(getNewInsta());

  const [gameInProgress, setGameInProgress] = useState(true);

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
    setGameInProgress(true);
  };

  const gameOver = () => {
    setGameInProgress(false);
  };

  const guessClick = e => {
    const guess = e.target.name;
    const highOrLow = calculateAnswer();

    const isCorrect = highOrLow === guess;

    if (isCorrect) {
      setScore(score + 1);
      startNewRound();
    } else {
      gameOver();
    }
  };

  if (gameInProgress) {
    return (
      <div>
        <h2>{score}</h2>
        <InstaDisplay insta={givenInsta}></InstaDisplay>
        <InstaDisplay insta={hiddenInsta}></InstaDisplay>
        <button onClick={guessClick} name="higher">
          Higher
        </button>
        <button onClick={guessClick} name="lower">
          Lower
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Game Over</h1>
        <h3>Your Score Was: {score}</h3>
        <button onClick={startNewGame}>Play Again?</button>
      </div>
    );
  }
};

export default Game;
