import React, { useState } from "react";
import {
  Typography,
  Container,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@material-ui/core";
import {
  produceMelody,
  setPlayerTempo,
  Pause,
  Resume,
  isPlayerInitiated,
  dispose
} from "../MelodyProduction/MelodyProduction";
import {
  produceMelodyBasic,
  PauseBasic,
  ResumeBasic,
  isPlayerInitiatedBasic,
  disposeBasic
} from "../MelodyProduction/BasicMelodyProduction";
import "./interface.css";
import PlayController from "./playController";
import LoadWheel from "./LoadWheel";

function Generate() {
  const [loading, setLoading] = useState(false);

  const [tempo, setTempo] = useState(60);

  const handleTempoChange = event => {
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
    <div>
      <Typography variant="h1" component="h1">
        Generate 1
      </Typography>
      <FormControl>
        <InputLabel id="label" value="60">
          Tempo
        </InputLabel>
        <Select
          labelid="label"
          value={tempo}
          onChange={handleTempoChange}
          inputProps={{
            tempo: "tempo"
          }}
        >
          <MenuItem value={60}>60</MenuItem>
          <MenuItem value={80}>80</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={120}>120</MenuItem>
        </Select>
      </FormControl>
      <div className="play-controller-wrapper" onClick={handlePlayerChange}>
        <PlayController state={playerState}></PlayController>
      </div>
      <LoadWheel loading={loading}></LoadWheel>
    </div>
  );
}

function GenerateBasic() {
  const [loading, setLoading] = useState(false);

  // const [tempo, setTempo] = useState(60);

  // const handleTempoChange = event => {
  //   setTempo(event.target.value);
  //   // setPlayerTempo(tempo);
  // };

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
      {/* <FormControl>
        <InputLabel id="label" value="60">
          Tempo
        </InputLabel>
        <Select
          labelid="label"
          value={tempo}
          onChange={handleTempoChange}
          inputProps={{
            tempo: "tempo"
          }}
        >
          <MenuItem value={60}>60</MenuItem>
          <MenuItem value={80}>80</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={120}>120</MenuItem>
        </Select>
      </FormControl> */}
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
            final year project.
          </Typography>
        </Paper>
      </Container>
    </div>
  );
}

export default function Interface(props) {
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
