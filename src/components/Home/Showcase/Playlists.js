import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';

function Playlists(props) {
  const navigate = useNavigate(); //for navigating to /playlists

  const cardContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0.5rem',
  };

  return (
    <div style={cardContainerStyle}>
      {props.playlists.map((playlist) => {
        const cardStyle = {
          margin: '0.5rem',
        };

        const imageStyle = {
          flexShrink: 0,
          borderRadius: '0.5rem',
          width: '100%',
          height: '14rem',
          objectFit: 'cover',
          objectPosition: 'center',
          marginBottom: '1rem',
        };

        const buttonStyle = {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          width: '3rem',
          height: '3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: '0.5rem',
          border: '2px solid rgba(255, 255, 255, 0.5)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          opacity: '0',
          transition: 'opacity 0.3s',
        };

        const titleStyle = {
          width: '100%',
        };

        const cardTitleStyle = {
          fontSize: '1rem',
          fontWeight: 'bold',
          color: 'black',
        };

        return (
          <div
            key={playlist.id}
            style={cardStyle}
            onClick={() => {
              props.setPlaylistId(playlist.id);
              navigate('/playlists');
            }}
          >
            <div style={{ position: 'relative', height: '100%' }}>
              <img style={imageStyle} src={playlist.image} alt={playlist.name} />

              <button
                style={buttonStyle}
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
                  style={{ width: '1.5rem', height: '1.5rem' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                  />
                </svg>
              </button>

              <div style={titleStyle}>
                <h2 style={cardTitleStyle}>
                  {props.name.length > 26 ? props.name.substring(0, 27) + '...' : props.name}
                </h2>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Playlists;
