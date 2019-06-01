import React from "react";
import { hot } from "react-hot-loader";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js"
import TournamentList from "./components/TournamentList.js";

class BayesCodingChallenge extends React.Component 
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <React.Fragment>
                <Header />
                <TournamentList />
                <Footer />
            </React.Fragment>
        );
    }
}

export default hot(module)(BayesCodingChallenge);