import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Heading from './Heading';
import Songs from './Songs';
import Albums from './Albums';
import Playlists from './Playlists';

function Showcase(props) {
  const navigate = useNavigate();

  const [trending_songs, setTrendingSongs] = useState([]);
  const [trending_albums, setTrendingAlbums] = useState([]);
  const [top_albums, setTopAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [charts, setCharts] = useState([]);

  const searchFromId = async (id) => {
    let raw_resp = await fetch(`https://down-spot.vercel.app/songs?id=${id}`);
    let resp = await raw_resp.json();
    props.setDetails(resp.data[0]);
    navigate('/song/:id');
  };

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };
const getShowcase = (data, type) => {
  let data_showcase = [];
  let count = 0;
  
  while (count < 10) {
    if (!data || !Array.isArray(data) || count >= data.length || !data[count] || data[count].type !== type) {
      break;
    }
    let data_name = data[count].name ? data[count].name : data[count].title;
    data_showcase.push({
      name: data_name,
      image: data[count].image && data[count].image[2] ? data[count].image[2].link : null,
      id: data[count].id
    });
    count += 1;
  }
  
  return shuffle(data_showcase);
};

const setHomepageData = async () => {
  let uri = 'https://down-spot.vercel.app/modules?language=malayalam';

  props.setProgress(30);
  let data = await fetch(uri);
  props.setProgress(50);

  let resp = await data.json();
  console.log('API Response:', resp); // Add this line to check the response

  props.setProgress(70);

  // Check if the expected data is present in the response
  console.log('Data:', resp['data']); // Add this line to check the 'data' property

  // Trending songs:
  setTrendingSongs(getShowcase(resp['data']['trending']['songs'], 'song'));

  // Trending albums:
  setTrendingAlbums(getShowcase(resp['data']['trending']['albums'], 'album'));

  // Top albums:
  setTopAlbums(getShowcase(resp['data']['albums'], 'album'));

  // Playlists:
  setPlaylists(getShowcase(resp['data']['playlists'], 'playlist'));

  // Charts:
  setCharts(getShowcase(resp['data']['charts'], 'playlist'));

  props.setProgress(100);
};

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    document.title = 'Popular Now - MusicWorld by HM';
    setHomepageData();
  }, []);

  return (
    <div style={{ background: '#f8f8f8' }}>
      <section style={{ color: '#000', background: '#f8f8f8' }}>
        <div style={{ padding: '0 2rem', marginBottom: '0' }}>
          <Heading title="Trending Now" />
          <Songs songs={trending_songs} searchFromId={searchFromId} />

          <Heading title="Popular Albums" />
          <Albums albums={trending_albums} setAlbumId={props.setAlbumId} />

          <Heading title="Editorial Picks" />
          <Albums albums={top_albums} set
AlbumId={props.setAlbumId} />

          <Heading title="Top Charts" />
          <Playlists playlists={charts} setPlaylistId={props.setPlaylistId} />

          <Heading title="Made for you" />
          <Playlists playlists={playlists} setPlaylistId={props.setPlaylistId} />
        </div>
      </section>
    </div>
  );
}

export default Showcase;
