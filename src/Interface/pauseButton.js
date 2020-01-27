import React from "react";
import { Fab } from "@material-ui/core";
import PauseIcon from "@material-ui/icons/Pause";

function PauseButton() {
  return (
    <Fab color="primary" aria-label="pause">
      <PauseIcon></PauseIcon>
    </Fab>
  );
}

export default PauseButton;
