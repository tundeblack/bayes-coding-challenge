import React from "react";
import { hot } from "react-hot-loader";
import TournamentDetails from "./TournamentDetails.js";

class Tournament extends React.Component 
{
    constructor(props)
    {
        super(props);

        this.state = {
            showDetails: false
        };
        this.toggleDetails = this.toggleDetails.bind(this);
    }

    toggleDetails() 
    {
        this.setState(
            (prevState) => 
            {
                return { showDetails: !prevState.showDetails }
            }
        );
    }

    render()
    {
        return (
            <div className="row cls-tournament p-2 my-4 mx-2">
                <div className="col-10">
                    {
                        (this.state.showDetails)?

                            <TournamentDetails 
                                tournamentName = { this.props.tournamentName }
                                tournamentLocation = { this.props.city + ", " + this.props.country }
                                tournamentStartDate = { this.props.startDate }
                                tournamentEndDate = { this.props.endDate }
                                name = { this.props.seriesName }
                                startDate = { this.props.seriesStartDate }
                                endDate = { this.props.seriesEndDate }
                            />
                        : 
                            <React.Fragment>
                                <h6 className="linkable mb-0" onClick = { this.toggleDetails }>
                                    { this.props.tournamentName }
                                </h6>
                                
                                <span className="muted d-block">{ this.props.city }, {this.props.country}</span>

                                <p className="my-2">{ this.props.startDate } to { this.props.endDate }</p>
                            </React.Fragment>
                    }
                </div>
                <div className="col-2">
                    <span className = "linkable" onClick={ this.toggleDetails }>
                        <span className="d-none d-md-inline">Details</span>&nbsp; 
                        <span className={
                            "fas" + (
                                (this.state.showDetails)? " fa-caret-up" : " fa-caret-down"
                            )
                        }></span>
                    </span>
                </div>
            </div>
        );
    }
}

export default hot(module)(Tournament);