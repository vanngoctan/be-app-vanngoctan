import React from 'react';
import { useHistory } from 'react-router-dom';

export default function EventBanner(props) {

    let history = useHistory();

    return (
        <div className="event-banner">
            <h2>{props.title}</h2>
            <div>
                {props.description}
            </div>
            <br/>
            <button className="join-btn" onClick={()=>{history.push(`/register/${props.eventId}`)}}>Register</button>
        </div>
    )
}
