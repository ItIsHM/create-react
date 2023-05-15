import React from 'react';
import Card from './Card';

function Songs(props) {
  const cardContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0.5rem',
  };

  return (
    <div style={cardContainerStyle}>
      {props.songs.map((song) => {
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
            key={song.id}
            style={cardStyle}
            onClick={() => props.searchFromId(song.id)}
          >
            <div style={{ position: 'relative', height: '100%' }}>
              <img style={imageStyle} src={song.image} alt={song.name} />

              <div style={titleStyle}>
                <h2 style={cardTitleStyle}>
                  {song.name.length > 26 ? song.name.substring(0, 27) + '...' : song.name}
                </h2>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Songs;
