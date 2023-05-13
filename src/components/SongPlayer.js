import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import download from 'js-file-download';

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

  const handleDownload = async (url) => {
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      const songBlob = response.data;
      const filename = `${song.name} - ${song.primaryArtists.split(',')[0]}.m4a`;
      download(songBlob, filename);
    } catch (error) {
      console.error('An error occurred while downloading the song:', error);
    }
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
