import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Web3React } from "./components/web3ReactProvider";

ReactDOM.render(
  <React.StrictMode>
    <Web3React>
      <App />
    </Web3React>
  </React.StrictMode>,
  document.getElementById("root")
);
