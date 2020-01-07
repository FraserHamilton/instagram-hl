import React, { useState } from "react";
import "./App.css";
import instaData from "./instaData.json";
import $ from "jquery";

const Game = () => {
  const getNewInsta = () => {
    return instaData[Math.floor(Math.random() * instaData.length)];
  };

  const [givenInsta, setGivenInsta] = useState(null);

  const [hiddenInsta, setHiddenInsta] = useState(null);

  const [gameInProgress, setGameInProgress] = useState(false);

  const [score, setScore] = useState(0);

  const newGivenInsta = () => {
    const newInsta = instaData[Math.floor(Math.random() * instaData.length)];
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://instatools.online/user/" + newInsta.name;
    fetch(proxyurl + url)
      .then(response => response.text())
      .then(contents => {
        const profilePic = $(contents)
          .find("div[class='profile-avatar']")
          .find("img")
          .attr("src");

        setGivenInsta({ ...newInsta, profilePic: profilePic });
      })
      .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser?")
      );
  };

  const newHiddenInsta = () => {
    const newInsta = instaData[Math.floor(Math.random() * instaData.length)];
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://instatools.online/user/" + newInsta.name;
    fetch(proxyurl + url)
      .then(response => response.text())
      .then(contents => {
        const profilePic = $(contents)
          .find("div[class='profile-avatar']")
          .find("img")
          .attr("src");

        setHiddenInsta({ ...newInsta, profilePic: profilePic });
      })
      .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser?")
      );
  };

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
    newGivenInsta();
  };

  const startNewGame = () => {
    newGivenInsta();
    newHiddenInsta();
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
    if (gameInProgress && givenInsta && hiddenInsta) {
      return (
        <div>
          <h3>{score}</h3>
          <img src={givenInsta.profilePic}></img>
          <p>
            {givenInsta.name} : {givenInsta.followers}
          </p>
          <img src={hiddenInsta.profilePic}></img>
          <p>
            {hiddenInsta.name} : {hiddenInsta.followers}
          </p>
          <button onClick={guessClick} name="higher">
            Higher
          </button>
          <button onClick={guessClick} name="lower">
            Lower
          </button>
        </div>
      );
    } else {
      return <div>loading</div>;
    }
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
