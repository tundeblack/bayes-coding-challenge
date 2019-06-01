import React from "react";
import { hot } from "react-hot-loader";

function Loading()
{
    return (
        <div className="text-center">
            <span className="fas fa-spinner fa-pulse"></span>
        </div>
    );
}

export default hot(module)(Loading);