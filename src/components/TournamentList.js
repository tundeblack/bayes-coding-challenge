import React from "react";
import { hot } from "react-hot-loader";
import FilterBar from "./FilterBar.js";
import Tournament from "./Tournament.js";
import Message from "./Message.js";
import Loading from "./Loading.js";
import AppConfig from "../../config/AppConfig.js"; 

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
        this.onChangeStartDateTimeFilter = this.onChangeStartDateTimeFilter.bind(this);
        this.onChangeEndDateTimeFilter = this.onChangeEndDateTimeFilter.bind(this);
        this.onSeriesChange = this.onSeriesChange.bind(this);
        this.updateState = this.updateState.bind(this);
        this.filterTournaments = this.filterTournaments.bind(this);
    }
    updateState(state)
    {
        this.setState(state);
    }
    yearMonthDay(date)
    {
        return date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + date.getDate().toString().padStart(2, '0');
    }

    onSeriesChange(e)
    {
        this.setState(
            {
                currentSeriesFilterValue: e.currentTarget.value
            }
        );
    }
    onChangeStartDateTimeFilter(date)
    {
        this.setState(
            {
                currentStartDateFilterValue: date
            }
        );
    }
    onChangeEndDateTimeFilter(date)
    {
        this.setState(
            {
                currentEndDateFilterValue: date
            }
        );
    }

    filterTournaments()
    {
        let filtered = this.state.tournaments;
        if (filtered !== null)
        {
            filtered = filtered.filter(
                (t) =>
                {
                    let filters = [];
                    let index = 0;
                        
                    if (this.state.currentSeriesFilterValue !== "")
                    {
                        filters[index++] = (t.series.name == this.state.currentSeriesFilterValue);
                    }
                    if (this.state.currentStartDateFilterValue !== null)
                    {
                        let start = new Date(t.date_start.substr(0, t.date_start.indexOf(" ")).replace(/ /g, '/'));
                        filters[index++] = (start.getFullYear() >= this.state.currentStartDateFilterValue.getFullYear()
                                            && start.getMonth() >= this.state.currentStartDateFilterValue.getMonth()
                                            && start.getDate() >= this.state.currentStartDateFilterValue.getDate()
                                            );
                    }
                    if (this.state.currentEndDateFilterValue !== null)
                    {
                        let end = new Date(t.date_end.substr(0, t.date_end.indexOf(" ")).replace(/ /g, '/'));
                        filters[index++] = (end.getFullYear() <= this.state.currentEndDateFilterValue.getFullYear()
                                            && end.getMonth() <= this.state.currentEndDateFilterValue.getMonth()
                                            && end.getDate() <= this.state.currentEndDateFilterValue.getDate()
                                            );
                    }

                    return (filters.length > 0)? 
                                filters.reduce((accumulator, val) => accumulator & val)
                            :
                                true;
                }   
            );
        
            this.setState(
                {
                    filteredTournaments: filtered
                }
            );
        }
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
                throw new Error("Repsonse from server was not ok.");
            }
        ).then(
            (response) => 
            {
                // Extract Series names into an array of its own
                let seriesNames = [];
                for (let obj of response)
                {
                    if (! seriesNames.includes(obj.series.name))
                    {
                        seriesNames.push(obj.series.name); 
                    }
                }

                updateState(
                    {
                        tournaments: response,
                        filteredTournaments: response,
                        fetchingTournamentsList: false,
                        seriesNamesList: seriesNames,
                        errorMessage: ""
                    }
                );
            }
        ).catch(
            (error) => 
            {
                updateState(
                    {
                        errorMessage: "Error occurred: " + error.message,
                        fetchingTournamentsList: false
                    }
                )
            }
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if (this.state.currentSeriesFilterValue !== prevState.currentSeriesFilterValue 
        || this.state.currentStartDateFilterValue !== prevState.currentStartDateFilterValue
        || this.state.currentEndDateFilterValue !== prevState.currentEndDateFilterValue)
        {
            this.filterTournaments();
        }
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
            try 
            {
                comp = this.state.filteredTournaments.map(
                    (t, i) => 
                    {
                        return <Tournament 
                            key = { t.id }
                            seriesName = { t.series.name }
                            seriesStartDate = { t.series.date_start }
                            seriesEndDate = { t.series.date_end }
                            tournamentName = { t.name }
                            city = { t.city }
                            country = { t.country }
                            startDate = { t.date_start }
                            endDate = { t.date_end }
                        />;
                    }
                );
            } catch (error)
            {
                // In case data retrieved isn't in the expected object format
                comp = <Message 
                            type = "error"
                            text = { error.message }
                        />;
            }
        }

        return <section className="container my-4 bordered rounded p-4" >
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="col-12">
                                <FilterBar
                                    seriesFilterNamesList = { this.state.seriesNamesList }
                                    seriesFilterValue = { this.state.currentSeriesFilterValue }
                                    startDateValue = { this.state.currentStartDateFilterValue }
                                    endDateValue = { this.state.currentEndDateFilterValue }
                                    seriesFilterNamesList = { this.state.seriesNamesList }

                                    seriesFilterOnChangeCallback = { this.onSeriesChange }
                                    startDateOnChangeCallback = { this.onChangeStartDateTimeFilter }
                                    endDateOnChangeCallback = { this.onChangeEndDateTimeFilter }
                                    filterCallback = { this.filterTournaments }
                                />    
                            </div>
                            <hr className="my-2" />
                            { error }
                            <div className="col-12">
                                { comp }
                            </div>
                        </div>
                    </div>
                </section>;
    }
}

export default hot(module)(TournamentList); 