import React from "react";
import { hot } from "react-hot-loader";

function Message(props) 
{
    let styles = "m-2 p-2";
    if (props.type === "error")
    {
        styles += " alert alert-danger";
    } else if (props.type === "success")
    {
        styles += " alert alert-success";
    }

    return (
        <div className={ styles }>{ props.text }</div>
    );
}

export default hot(module)(Message);