import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import download from 'js-file-download';
import './blobdownloader.js';

const SongPlayer = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get(`https://down-spot.vercel.app/songs?id=${id}`);
        const data = response.data;
        if (data && data.status === 'SUCCESS' && data.data && data.data.length > 0) {
          setSong(data.data[0]);
          setSelectedQuality(data.data[0].downloadUrl[0].quality);
        } else {
          setSong(null);
          setSelectedQuality(null);
        }
      } catch (error) {
        console.error('An error occurred:', error);
        setSong(null);
        setSelectedQuality(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSong();
  }, [id]);

  const handleDownload = async (url, buttonId) => {
    try {
      gonativeDownloadBlobUrl(url);
    } catch (error) {
      console.error('An error occurred while downloading the song:', error);
    }
  };

  useEffect(() => {
    window.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message && message.event === 'fileEnd') {
        console.log('File download completed:', message.id);
      }
    });

    return () => {
      window.removeEventListener('message');
    };
  }, []);

  const handleQualityChange = (quality) => {
    setSelectedQuality(quality);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ fontSize: '24px', textAlign: 'center', animation: 'blink-animation 1s infinite' }}>
          Loading...
        </div>
      </div>
    );
  }

  if (!song) {
    return <div>No song found.</div>;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{song.name}</h1>
      <img src={song.image[1].link} alt="Song Thumbnail" style={{ width: '150px', height: '150px' }} />
      <p>Artist: {song.primaryArtists}</p>
      <div>
        <select
          value={selectedQuality}
          onChange={(e) => handleQualityChange(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            margin: '16px',
            fontSize: '16px',
          }}
        >
          {song.downloadUrl.map((item) => (
            <option key={item.quality} value={item.quality}>
              {item.quality}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
        <button
          style={{
            backgroundColor: '#ff5a5f',
            color: '#fff',
            border: 'none',
            borderRadius: '4',
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Play
        </button>
        {song.downloadUrl.map((item, index) => (
          <button
            key={item.quality}
            onClick={() => handleDownload(item.link, `downloadButton-${index}`)}
            id={`downloadButton-${index}`}
            style={{
              backgroundColor: '#4caf50',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 16px',
              margin: '8px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Download {item.quality}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SongPlayer;
