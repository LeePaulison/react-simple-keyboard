import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

const root = document.createElement("div");
root.className = "root";

document.body.appendChild(root);

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  root
);
