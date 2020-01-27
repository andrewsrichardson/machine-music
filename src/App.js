import React, { useState } from "react";
import "./App.css";
import TitleCard from "./TitleCard/TitleCard";
import NavTabs from "./NavTabs/NavTabs";
import Interface from "./Interface/interface";

function App() {
  const [view, setView] = useState(0);

  return (
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
  );
}

export default App;
