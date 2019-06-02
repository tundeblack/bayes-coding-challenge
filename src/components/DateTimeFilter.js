import React from "react";
import { hot } from "react-hot-loader";
import DateTimePicker from "react-datetime-picker";

function DateTimeFilter(props)
{
    return (
        <DateTimePicker 
            onChange = { props.onChangeCallback }
            value = { props.dateTimeValue }
            format = "y-MM-dd"
            disableClock = { true }
        />
    );
}

export default hot(module)(DateTimeFilter);