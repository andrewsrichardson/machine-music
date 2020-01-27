import React from "react";
import PlayButton from "./playButton.js";
import PauseButton from "./pauseButton.js";

function PlayController(props) {
  const playerState = props.state;
  if (playerState === false) {
    return <PlayButton></PlayButton>;
  } else {
    return <PauseButton></PauseButton>;
  }
}

export default PlayController;
