import React from "react";
import { hot } from "react-hot-loader";
import SeriesFilter from "./SeriesFilter.js";
import DateTimeFilter from "./DateTimeFilter.js";

function FilterBar(props)
{
    return (
        <div className="row align-items-end sticky-top justify-content-md-between p-2">
            <div className="col-md-3">
                <span className="muted">Series</span>
                <SeriesFilter 
                    selected = { props.seriesFilterValue }
                    onChangeCallback = { props.seriesFilterOnChangeCallback }
                    namesList = { props.seriesFilterNamesList }
                />
            </div>
            <div className="col-md-auto">
                <span className="muted d-block">Start Date</span>
                <DateTimeFilter 
                    onChangeCallback = { props.startDateOnChangeCallback }
                    dateTimeValue = { props.startDateValue }
                />
            </div>
            <div className="col-md-auto">
                <span className="muted d-block">End Date</span>
                <DateTimeFilter 
                    onChangeCallback = { props.endDateOnChangeCallback }
                    dateTimeValue = { props.endDateValue }
                />
            </div>
            <div className="col-md-1 my-2 my-md-0 d-none">
                <button 
                    className="btn btn-sm btn-primary"
                    onClick = { props.filterCallback }
                >Filter</button>
            </div>
        </div>
    );
}

export default hot(module)(FilterBar); 
