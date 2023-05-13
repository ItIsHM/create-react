import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SongPlayer = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get(`https://saavn.me/songs?id=${id}`);
        const data = response.data;

        if (data && data.length > 0) {
          setSong(data[0]);
        } else {
          setSong(null);
        }
      } catch (error) {
        console.error('An error occurred:', error);
        setSong(null);
      }
    };

    fetchSong();
  }, [id]);

  const handleDownload = (url) => {
    window.open(url, '_blank');
  };

  if (!song) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{song.title}</h1>
      <audio controls>
        <source src={song.url} type="audio/mp4" />
      </audio>
      <div>
        {Object.entries(song.download_urls).map(([quality, url]) => (
          <button key={quality} onClick={() => handleDownload(url)}>
            Download {quality}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SongPlayer;
