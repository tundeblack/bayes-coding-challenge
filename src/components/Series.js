import React from "react";
import { hot } from "react-hot-loader";

function Series(props)
{
    return (
        <div className="row m-2 p-2">
            <div className="col-12">
                <span className="muted">Series Name</span>
                <div>{ props.name }</div>
            </div>
            <div className="col-12">
                <span className="muted">Start Date</span>
                <div>{ props.startDate }</div>
            </div>
            <div className="col-12">
                <span className="muted">End Date</span>
                <div>{ props.endDate }</div>
            </div>
        </div>
    );
}

export default hot(module)(Series); 