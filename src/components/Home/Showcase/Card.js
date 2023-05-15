import React from 'react';
import './Card.css'; // Import the CSS file for the component

function Card(props) {
  return (
    <div className="card-container" onClick={props.onClick}>
      <div className="card-content">
        <img
          className="card-image"
          src={props.image}
          alt={props.name}
        />

        <button
          className="control-button"
          id="controlBtn"
          onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseOut={(e) => (e.currentTarget.style.opacity = '0')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="white"
            className="control-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
            />
          </svg>
        </button>

        <div className="card-title">
          <h2 className="card-title-text">
            {props.name.length > 26 ? props.name.substring(0, 27) + '...' : props.name}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Card;
