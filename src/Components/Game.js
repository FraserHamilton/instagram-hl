import React, { useState } from "react";
import instaData from "../Data/instaDataFinal.json";
import GameOver from "./GameOver";
import StartScreen from "./StartScreen";
import CountUp from "react-countup";
import ButtonGroup from "./ButtonGroup";
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
    setGameStage(2);
  };

  const startNewGame = () => {
    setGivenInsta(getNewInsta());
    setHiddenInsta(getNewInsta());
    setScore(0);
    setGameStage(2);
  };

  const gameOver = () => {
    setGameStage(4);
  };

  const guessClick = e => {
    const guess = e.target.name;

    const highOrLow = calculateAnswer();

    const isCorrect = highOrLow === guess;

    setGameStage(3);

    setTimeout(() => {
      if (isCorrect) {
        setScore(score + 1);
        startNewRound();
      } else {
        gameOver();
      }
    }, 3000);
  };

  if (gameStage === 1) {
    return <StartScreen startFunc={startNewGame}></StartScreen>;
  } else if (gameStage === 2 || gameStage === 3) {
    return (
      <div className={className}>
        <h1 className={"score"}>Score: {score}</h1>
        <div
          Style={`background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('${givenInsta.picture}');`}
          className={"instaDisplay"}
        >
          <img
            alt={givenInsta.name}
            height="200px"
            src={givenInsta.picture}
          ></img>
          <h2>{givenInsta.name}</h2>
          <p>Has</p>
          <h1>{givenInsta.followers}M</h1>
          <p>Followers</p>
        </div>
        <div id="versus">
          <h1>VS</h1>
        </div>
        <div
          Style={`background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('${hiddenInsta.picture}');`}
          className={"instaDisplay"}
        >
          <img
            alt={hiddenInsta.name}
            height="200px"
            src={hiddenInsta.picture}
          ></img>
          <h2>{hiddenInsta.name}</h2>
          <p>Has</p>
          {gameStage === 3 ? (
            <React.Fragment>
              <h1>
                <CountUp decimals={2} end={parseFloat(hiddenInsta.followers)} />
                M
              </h1>
              <p>Followers Than {givenInsta.name}</p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ButtonGroup clickFunction={guessClick}></ButtonGroup>
              <p>Followers Than {givenInsta.name}</p>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  } else {
    return <GameOver score={score} restartFunc={startNewGame}></GameOver>;
  }
};

const StyledGame = styled(Game)`
  #versus {
    color: #fff989;
  }
  .instaDisplay {
    background-repeat: no-repeat;
    background-position: top;
    background-size: 200px;
    min-height: 225px;
    h1 {
      color: #fff989;
      min-height: 110px;
      line-height: 110px;
      white-space: nowrap;
      font-size: 3em;
      margin: 0;
    }
  }
  img {
    display: none;
  }
  .score {
    margin-top: 10%;
  }

  @media (min-width: 420px) {
    #versus {
      display: inline-block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff989;
    }
    .instaDisplay {
      background-image: none !important;
      display: inline-block;
      width: 500px;
      min-height: 500px;
    }
    img {
      display: inline;
    }
  }
`;

export default StyledGame;
