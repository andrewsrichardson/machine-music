import React from "react";
import { Fab } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

function PlayButton() {
  return (
    <Fab color="primary" aria-label="play">
      <PlayArrowIcon></PlayArrowIcon>
    </Fab>
  );
}

export default PlayButton;
