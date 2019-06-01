import React from "react";
import { hot } from "react-hot-loader";
import Series from "./Series.js";

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
            <div className="row right-red border rounded p-2 my-4 mx-2">
                <div className="col-10">
                    {
                        (this.state.showDetails)?
                            <Series 
                                name = { this.props.seriesName }
                                startDate = { this.props.seriesStartDate }
                                endDate = { this.props.seriesEndDate }
                            />
                        : 
                            <React.Fragment>
                                <h5 className="linkable" onClick = { this.toggleDetails }>
                                    { this.props.tournamentName }
                                </h5>
                                
                                <span className="muted">{ this.props.city }, {this.props.country}</span>

                                <p>{ this.props.startDate } - { this.props.endDate }</p>
                            </React.Fragment>
                    }
                </div>
                <div className="col-2">
                    <a href="#" onClick={ this.toggleDetails }>
                        <span className={
                            "fas fa-2x" + (
                                (this.state.showDetails)? " fa-caret-down" : " fa-caret-up"
                            )
                        }></span>
                    </a>
                </div>
            </div>
        );
    }
}

export default hot(module)(Tournament);