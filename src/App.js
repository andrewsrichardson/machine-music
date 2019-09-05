import React, {useState} from 'react';
import './App.css';
import TitleCard from './TitleCard/TitleCard';
import NavTabs from './NavTabs/NavTabs';
import Interface from './Interface/interface';
import Visualiser from './Playlist/Playlist';





function App() {

  const [view , setView] = useState(0);
  
  return (
    <div className="App">
      <div className="Header">
        <TitleCard></TitleCard>
      </div>
      <div className="Body">
        <NavTabs view= {view} updateView= {setView}/>
        <Interface view= {view}></Interface>
        <Visualiser/>
      </div> 
      <div className="Footer">

      </div>

    </div>
  );
}

export default App;