import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import BayesCodingChallenge from "./BayesCodingChallenge.js";

ReactDOM.render(
    <BrowserRouter basename="/">
        <BayesCodingChallenge />
    </BrowserRouter>,
    document.getElementById("root")
)