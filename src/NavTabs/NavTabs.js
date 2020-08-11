import React from "react";
import { Paper, Tabs, Tab } from "@material-ui/core";
import "./NavTabs.css";

export default function NavTabs(props) {
  function handleChange(event, newValue) {
    props.updateView(newValue);
  }

  return (
    <div>
      <Paper square>
        <Tabs
          value={props.view}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="nav tabs"
          centered={true}
        >
          <Tab label="Generate" />
          <Tab label="Generate 2" disabled />
          <Tab label="About" />
        </Tabs>
      </Paper>
    </div>
  );
}
