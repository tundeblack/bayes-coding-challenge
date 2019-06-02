import React from "react";
import { hot } from "react-hot-loader";

function Header()
{
    return (
        <div className="m-2 text-center">
            <h4 className="lead">Bayes Frontend Coding Challenge</h4>
            <span className="muted">Tournaments List</span>
        </div>
    );
}

export default hot(module)(Header); 