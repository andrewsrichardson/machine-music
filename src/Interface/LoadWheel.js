import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

var loading = false;

export function startLoadWheel() {
  loading = true;
}
export function stopLoadWheel() {
  loading = false;
}

export default function LoadWheel(props) {
  loading = props.loading;
  if (loading === true) {
    return <CircularProgress color="primary"></CircularProgress>;
  } else {
    return null;
  }
}
