import React, { useState } from "react";
import {
  Typography,
  Container,
  Paper,
  Button,
  Select,
  Input,
  MenuItem,
  FormControl,
  InputLabel
} from "@material-ui/core";
import {
  produceMelody,
  Resume,
  Pause
} from "../MelodyProduction/MelodyProduction";
import "./interface.css";

function Generate() {
  const [tempo, setTempo] = useState(140);

  const handleChange = event => {
    setTempo(event.target.value);
  };
  return (
    <div>
      <Typography variant="h1" component="h1">
        Generate
      </Typography>
      <FormControl>
        <InputLabel>Tempo</InputLabel>
        <Select
          value={tempo}
          onChange={handleChange}
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
      <Button onClick={() => produceMelody(tempo)}>ProduceMelody</Button>
      <Button onClick={Pause}>Pause</Button>
      <Button onClick={Resume}>Play</Button>
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
