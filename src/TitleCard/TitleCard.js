import React from "react";
import "./TitleCard.css";
import { Box, Paper } from "@material-ui/core";
import "fontsource-cairo";

export default function TitleCard() {
  return (
    <Box>
      <Paper>
        <h1 className="title">Machine Music</h1>
        <h2 className="subtitle">
          Procedurally generated music, powered by machine learning
        </h2>
      </Paper>
    </Box>
  );
}
