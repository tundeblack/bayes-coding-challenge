import React from "react";
import { hot } from "react-hot-loader";
import SeriesFilter from "./SeriesFilter.js";
import DateTimeFilter from "./DateTimeFilter.js";

function FilterBar(props)
{
    return (
        <div className="bordered rounded p-2">
            <div>
                <span className="muted">Series</span>
                <SeriesFilter 
                    selected = { props.seriesFilterValue }
                    onChangeCallback = { props.seriesFilterOnChangeCallback }
                    namesList = { props.seriesFilterNamesList }
                />
            </div>
            <hr className="my-2" />
            <div>
                <span className="muted">Start Date</span>
                <DateTimeFilter 
                    onChangeCallback = { props.startDateOnChangeCallback }
                    dateTimeValue = { props.startDateValue }
                />
            </div>
            <hr className="my-2" />
            <div>
                <span className="muted">End Date</span>
                <DateTimeFilter 
                    onChangeCallback = { props.endDateOnChangeCallback }
                    dateTimeValue = { props.endDateValue }
                />
            </div>
            <hr className="my-2" />
            <div className="text-right">
                <button 
                    className="btn btn-primary"
                    onClick = { props.filterCallback }
                >Filter</button>
            </div>
        </div>
    );
}

export default hot(module)(FilterBar); 
