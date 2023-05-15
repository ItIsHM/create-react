import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MusicPage = () => {
  const [trending, setTrending] = useState([]);
  const [popularAlbums, setPopularAlbums] = useState([]);
  const [editorialPicks, setEditorialPicks] = useState([]);
  const [topCharts, setTopCharts] = useState([]);
  const [madeForYou, setMadeForYou] = useState([]);

  useEffect(() => {
    fetch('https://down-spot.vercel.app/modules?language=malayalam')
      .then(response => response.json())
      .then(data => {
        setTrending(data.trending);
        setPopularAlbums(data.popular_albums);
        setEditorialPicks(data.editorial_picks);
        setTopCharts(data.top_charts);
        setMadeForYou(data.made_for_you);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Trending Now</h1>
      {trending.map(song => (
        <div key={song.id}>
          <Link to={`/song/${song.id}`}>
            <img src={song.thumbnail} alt={song.name} />
            <p>{song.name}</p>
            <p>{song.artist}</p>
          </Link>
        </div>
      ))}

      <h1>Popular Albums</h1>
      {popularAlbums.map(album => (
        <div key={album.id}>
          <Link to={`/song/${album.id}`}>
            <img src={album.thumbnail} alt={album.name} />
            <p>{album.name}</p>
            <p>{album.artist}</p>
          </Link>
        </div>
      ))}

      <h1>Editorial Picks</h1>
      {editorialPicks.map(song => (
        <div key={song.id}>
          <Link to={`/song/${song.id}`}>
            <img src={song.thumbnail} alt={song.name} />
            <p>{song.name}</p>
            <p>{song.artist}</p>
          </Link>
        </div>
      ))}

      <h1>Top Charts</h1>
      {topCharts.map(song => (
        <div key={song.id}>
          <Link to={`/song/${song.id}`}>
            <img src={song.thumbnail} alt={song.name} />
            <p>{song.name}</p>
            <p>{song.artist}</p>
          </Link>
        </div>
      ))}

      <h1>Made for You</h1>
      {madeForYou.map(song => (
        <div key={song.id}>
          <Link to={`/song/${song.id}`}>
            <img src={song.thumbnail} alt={song.name} />
            <p>{song.name}</p>
            <p>{song.artist}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MusicPage;
