import React, { useState } from "react";
import { Typography, Container, Paper } from "@material-ui/core";
import {
  produceMelody,
  setPlayerTempo,
  Pause,
  Resume,
  isPlayerInitiated,
  dispose,
} from "../MelodyProduction/MelodyProduction";
import {
  produceMelodyBasic,
  PauseBasic,
  ResumeBasic,
  isPlayerInitiatedBasic,
  disposeBasic,
} from "../MelodyProduction/BasicMelodyProduction";
import "./interface.css";
import PlayController from "./playController";
import LoadWheel from "./LoadWheel";

function Interface(props) {
  function Generate() {
    const [loading, setLoading] = useState(false);

    const [tempo, setTempo] = useState(60);

    const handleTempoChange = (event) => {
      setTempo(event.target.value);
      setPlayerTempo(tempo);
    };

    const [playerState, setPlayerState] = useState(false);

    function handlePlayerChange() {
      disposeBasic();
      if (playerState === true) {
        setPlayerState(false);
        Pause();
      }
      if (playerState === false) {
        setPlayerState(true);
        if (isPlayerInitiated() === false) {
          produceMelody(setLoading);
        }
        Resume();
      }
    }

    return (
      <div className="play-controller-wrapper" onClick={handlePlayerChange}>
        <PlayController state={playerState}></PlayController>
        <LoadWheel loading={loading}></LoadWheel>
      </div>
    );
  }

  function GenerateBasic() {
    const [loading, setLoading] = useState(false);

    const [playerStateBasic, setPlayerStateBasic] = useState(false);

    function handlePlayerChange() {
      dispose();
      if (playerStateBasic === true) {
        setPlayerStateBasic(false);
        PauseBasic();
      }
      if (playerStateBasic === false) {
        setPlayerStateBasic(true);
        if (isPlayerInitiatedBasic() === false) {
          produceMelodyBasic(setLoading);
        }
        ResumeBasic();
      }
    }

    return (
      <div>
        <Typography variant="h1" component="h1">
          Generate 2
        </Typography>
        <div className="play-controller-wrapper" onClick={handlePlayerChange}>
          <PlayController state={playerStateBasic}></PlayController>
        </div>
        <LoadWheel loading={loading}></LoadWheel>
      </div>
    );
  }

  function About() {
    return (
      <div className="main">
        <Container maxWidth="sm">
          <Paper className="About" elevation="5">
            <Typography variant="h5" component="h5">
              Machine music was made by Andrew Richardson as a sumbission for my
              final year project. It uses Google's Magenta.js to produce a
              melody, which is then evaluated by a custom fitness function and
              then rejected or used based on similarity.
            </Typography>
          </Paper>
        </Container>
      </div>
    );
  }

  switch (props.view) {
    case 0:
      return <Generate />;
    case 1:
      return <GenerateBasic />;
    case 2:
      return <About />;
    default:
      return <Generate />;
  }
}
export default Interface;
