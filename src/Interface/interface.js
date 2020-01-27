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
  isPlayerInitiated
} from "../MelodyProduction/MelodyProduction";
import "./interface.css";
import PlayController from "./playController";

function Generate() {
  const [tempo, setTempo] = useState(140);

  const handleTempoChange = event => {
    setTempo(event.target.value);
    setPlayerTempo(tempo);
  };

  const [playerState, setPlayerState] = useState(false);

  function handlePlayerChange() {
    if (playerState === true) {
      setPlayerState(false);
      Pause();
    }
    if (playerState === false) {
      setPlayerState(true);
      if (isPlayerInitiated() === false) {
        produceMelody(tempo);
      }
      Resume();
    }
  }

  return (
    <div>
      <Typography variant="h1" component="h1">
        Generate
      </Typography>
      <FormControl>
        <InputLabel>Tempo</InputLabel>
        <Select
          value={tempo}
          onChange={handleTempoChange}
          inputProps={{
            tempo: "tempo"
          }}
        >
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={120}>120</MenuItem>
          <MenuItem value={140}>140</MenuItem>
          <MenuItem value={160}>160</MenuItem>
        </Select>
      </FormControl>
      <div className="play-controller-wrapper" onClick={handlePlayerChange}>
        <PlayController state={playerState}>Test</PlayController>
      </div>
    </div>
  );
}

function Train() {
  return (
    <Typography variant="h1" component="h1">
      Train
    </Typography>
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
      return <Train />;
    case 2:
      return <About />;
    default:
      return <Generate />;
  }
}
