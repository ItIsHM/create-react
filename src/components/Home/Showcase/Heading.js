import React from 'react';

function Heading(props) {
  const headingStyle = {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    width: '100%',
    marginBottom: '0.5rem',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'black',
  };

  return (
    <div style={headingStyle}>
      <h1 style={titleStyle}>{props.title}</h1>
    </div>
  );
}

export default Heading;
