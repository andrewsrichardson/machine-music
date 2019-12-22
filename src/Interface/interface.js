import React from "react";
import { Typography, Container, Paper, Button } from "@material-ui/core";
import { produceMelody, Play } from "../MelodyProduction/MelodyProduction";
import "./interface.css";

function Generate() {
  return (
    <div>
      <Typography variant="h1" component="h1">
        Generate
      </Typography>
      <Button onClick={produceMelody}>ProduceMelody</Button>
      <Button onClick={Play}>Pause</Button>
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
          <Typography component="p">
            This app uses some bullshit to convince you that I know how machine
            learning works..
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
      return <About />;
  }
}
