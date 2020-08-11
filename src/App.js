import React, { useState } from "react";
import "./App.css";
import TitleCard from "./TitleCard/TitleCard";
import NavTabs from "./NavTabs/NavTabs";
import Interface from "./Interface/interface";
import { createMuiTheme } from "@material-ui/core/styles";
import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { blueGrey } from "@material-ui/core/colors";

function App() {
  const [view, setView] = useState(0);

  const theme = createMuiTheme({
    pallete: {
      primary: {
        main: blueGrey[600],
      },
      secondary: {
        main: blueGrey[100],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="Header">
          <TitleCard></TitleCard>
        </div>
        <div className="Body">
          <NavTabs view={view} updateView={setView} />
          <Interface view={view}></Interface>
        </div>
        <div className="Footer"></div>
      </div>
    </ThemeProvider>
  );
}

export default App;
