import React from 'react';
import "./card.css";

function Card(props) {
    return (
        <div className={props.variant==="green"?"custom-card green":"custom-card orange"} >
            <div className="d-flex justify-content-between mb-2">
                <h3>{props.title}</h3>
                {props.detailHandler?<button className="btn custom-btn" onClick={props.detailHandler}> View Details </button>:null}
            </div>

            <div>
                {props.children}

            </div>


        </div>
    )
}



export default Card

