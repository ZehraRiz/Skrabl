import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Div100vh from 'react-div-100vh'

ReactDOM.render(
  <React.StrictMode>
    <Div100vh>
      <App />
    </Div100vh>
  </React.StrictMode>,
  document.getElementById("root")
);
