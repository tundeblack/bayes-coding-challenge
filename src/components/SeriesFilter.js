import React from "react";
import { hot } from "react-hot-loader";

function SeriesFilter(props)
{
    return (
        <select 
            className="form-control" 
            value={ props.selected } 
            onChange={ props.onChangeCallback }
        >
            <option value=""></option>
            {
                (props.namesList)?
                    props.namesList.map(
                        (seriesName, idx) => 
                        {
                            return <option 
                                        key={ idx } 
                                        value={ seriesName }
                                    >
                                        { seriesName }
                                    </option>;
                        }
                    )
                :
                    null
            }
        </select>   
    )
}

export default hot(module)(SeriesFilter); 