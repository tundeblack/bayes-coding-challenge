import React from "react";
import { hot } from "react-hot-loader";
import FilterBar from "./FilterBar.js";
import Tournament from "./Tournament.js";
import Message from "./Message.js";
import Loading from "./Loading.js";
import AppConfig from "../config/AppConfig.js"; 

class TournamentList extends React.Component 
{
    constructor(props)
    {
        super(props);

        this.state = {
            tournaments: null,
            filteredTournaments: null,
            seriesNamesList: null, 

            currentSeriesFilterValue: "",
            currentStartDateFilterValue: null,
            currentEndDateFilterValue: null,

            fetchingTournamentsList: false,
            errorMessage: ""
        }
        this.onChange = this.onChange.bind(this);
        this.updateState = this.updateState.bind(this);
    }
    updateState(state)
    {
        this.setState(state);
    }

    onChange(e, state)
    {
        if (this.state[state] !== undefined)
        {
            this.setState(
                {
                    [ state ]: e.currentTarget.value 
                }
            );
        }
    }

    filterTournaments()
    {
        let filtered = this.state.tournaments;
        if (filtered !== null)
        {
            /**
             * =======================================================================================
             *  This portion of code could still be later refactored to be more concise
             * =======================================================================================
             */
            if (this.state.currentSeriesFilterValue !== "")
            {
                // Filter by Series name 
                filtered = filtered.filter(
                    (t) =>
                    {
                        return (t.series.name == this.state.currentSeriesFilterValue);
                    }   
                );
            }
            if (this.state.currentStartDateFilterValue !== null)
            {
                // Filter by Tournament Start Date
                filtered = filtered.filter(
                    (t) =>
                    {
                        return (t.date_start == this.state.currentStartDateFilterValue);
                    }   
                );
            }
            if (this.state.currentEndDateFilterValue !== null)
            {
                // Filter by Tournament End Date
                filtered = filtered.filter(
                    (t) =>
                    {
                        return (t.date_end == this.state.currentEndDateFilterValue);
                    }   
                );
            }
        }
        
        this.setState(
            {
                filteredTournaments: filtered
            }
        );
    }

    componentDidMount()
    {
        this.setState(
            {
                fetchingTournamentsList: true,
                errorMessage: ""
            }
        );

        let updateState = this.updateState;
        fetch(
            AppConfig.BAYES_FRONTEND_CHALLENGE_URL
        ).then(
            (response) =>
            {
                if (response.ok)
                {
                    return response.json();
                }
                throw new Error("Network problem occurred. Unable to fetch data from server.");
            }
        ).then(
            (response) => 
            {
                updateState(
                    {
                        tournaments: response,
                        fetchingTournamentsList: false,
                        errorMessage: ""
                    }
                );
            }
        ).catch(
            (error) => 
            {
                updateState(
                    {
                        errorMessage: error.Message,
                        fetchingTournamentsList: false
                    }
                )
            }
        )
    }

    render()
    {
        let error = (this.state.errorMessage)?
                        <Message 
                            type = "error"
                            text = { this.state.errorMessage }
                        />
                    :
                        null;

        let comp = null;
        if (this.state.fetchingTournamentsList)
        {
            comp = <Loading />; 
        } else if (this.state.filteredTournaments === null)
        {
            // this.state.tournaments is always null on initial render just before
            // the tournaments list is fetched in componentDidMount.
            // So, return empty div.
            comp = <div></div>
        } else if (this.state.filteredTournaments.length == 0)
        {
            comp = <Message 
                        type = "error"
                        text = "No tournaments found."
                    />
        } else 
        {
            comp = this.state.filteredTournaments.map(
                        (t, i) => 
                        {
                            return <Tournament 
                                seriesName = { t.series.name }
                                seriesStartDate = { t.series.date_start }
                                seriesEndDate = { t.series_date_end }
                                tournamentName = { t.name }
                                city = { t.city }
                                country = { t.country }
                                startDate = { t.date_start }
                                endDate = { t.date_end }
                            />;
                        }
                    );
        }

        return <section className="container my-4 bg-light bordered rounded p-4" >
                    <div className="row">
                        { error }
                        <div className="col-md-8 order-xs-2">
                            { comp }
                        </div>
                        <div className="col-md-4 order-xs-1">
                            <FilterBar
                                seriesFilterValue = { this.state.currentSeriesFilterValue }
                                startDateValue = { this.state.currentStartDateFilterValue }
                                endDateValue = { this.state.currentEndDateFilterValue }
                                seriesFilterNamesList = { this.state.seriesNamesList }

                                seriesFilterOnChangeCallback = { 
                                    (e) => 
                                    {
                                        this.seriesFilterOnChange(e, "currentSeriesFilterValue");
                                    } 
                                }
                                startDateOnChangeCallback = { 
                                    (e) => 
                                    {
                                        this.startDateOnChange(e, "currentStartDateFilterValue"); 
                                    }
                                }
                                endDateOnChangeCallback = { 
                                    (e) => 
                                    {
                                        this.endDateOnChange(e, "currentEndDateFilterValue"); 
                                    }
                                }
                                filterCallback = { this.filterTournaments }
                            />    
                        </div>
                    </div>
                </section>;
    }
}

export default hot(module)(TournamentList); 