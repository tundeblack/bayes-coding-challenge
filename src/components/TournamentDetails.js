import React from "react";
import { hot } from "react-hot-loader";

function TournamentDetails(props)
{
    return (
        <div className="row m-2 p-2">
            <div className="col-12 my-2">
                <span className="muted font-weight-bold small">Tournament Name</span>
                <div>{ props.tournamentName }</div>
            </div>
            <div className="col-12 my-2">
                <span className="muted muted font-weight-bold small">Tournament Location</span>
                <div>{ props.tournamentLocation }</div>
            </div>
            <div className="col-12 my-2">
                <span className="muted muted font-weight-bold small">Tournament Start Date</span>
                <div>{ props.tournamentStartDate }</div>
            </div>
            <div className="col-12 my-2">
                <span className="muted muted font-weight-bold small">Tournament End Date</span>
                <div>{ props.tournamentEndDate }</div>
            </div>
            <div className="col-12 my-2">
                <span className="muted font-weight-bold small">Series Name</span>
                <div>{ props.name }</div>
            </div>
            <div className="col-12 my-2">
                <span className="muted muted font-weight-bold small">Series Start Date</span>
                <div>{ props.startDate }</div>
            </div>
            <div className="col-12 my-2">
                <span className="muted muted font-weight-bold small">Series End Date</span>
                <div>{ props.endDate }</div>
            </div>
        </div>
    );
}

export default hot(module)(TournamentDetails); 