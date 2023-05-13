import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SongPlayer = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get(`https://saavn.me/songs?id=${id}`);
        const data = response.data;

        if (data && data.status === "SUCCESS" && data.data && data.data.length > 0) {
          setSong(data.data[0]);
        } else {
          setSong(null);
        }
      } catch (error) {
        console.error('An error occurred:', error);
        setSong(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSong();
  }, [id]);

  const handleDownload = (url) => {
    window.open(url, '_blank');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!song) {
    return <div>No song found.</div>;
  }

  return (
    <div>
      <h1>{song.name}</h1>
      <audio controls>
        <source src={song.url} type="audio/mp3" />
      </audio>
      <div>
        {song.downloadUrl.map((item) => (
          <button key={item.quality} onClick={() => handleDownload(item.link)}>
            Download {item.quality}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SongPlayer;
