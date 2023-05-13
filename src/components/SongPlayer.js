import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import download from 'js-file-download';
import ColorThief from 'color-thief-react';

const SongPlayer = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backgroundGradient, setBackgroundGradient] = useState('');

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get(`https://down-spot.vercel.app/songs?id=${id}`);
        const data = response.data;
        if (data && data.status === 'SUCCESS' && data.data && data.data.length > 0) {
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

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(song.image[2].link, {
          responseType: 'arraybuffer',
        });
        const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(imageBlob);

        const colorThief = new ColorThief();
        const image = new Image();
        image.src = imageUrl;
        image.onload = () => {
          const dominantColor = colorThief.getColor(image);
          const gradientColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
          setBackgroundGradient(`linear-gradient(to bottom, ${gradientColor}, #ffffff), url(${imageUrl})`);
        };
      } catch (error) {
        console.error('An error occurred while fetching the image:', error);
      }
    };

    if (song) {
      fetchImage();
    }
  }, [song]);

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
    <div style={{ textAlign: 'center', background: backgroundGradient }}>
      <h1>{song.name}</h1>
      <img src={song.image[2].link} alt="Song Thumbnail" style={{ width: '150px', height: '150px' }} />
      <p>Artist: {song.primaryArtists}</p>
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
