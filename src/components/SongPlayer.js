import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import download from 'js-file-download';
import { parseBlob } from 'music-metadata-browser';
import { ID3Writer } from 'browser-id3-writer';

const SongPlayer = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleDownload = async (url, buttonId) => {
    try {
      const response = await axios.get(url, {
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          const button = document.getElementById(buttonId);
          button.textContent = `Preparing Download ${progress}%`;
          button.disabled = true;
        },
      });
      const songBlob = response.data;
      const filename = `${song.name} - ${song.primaryArtists.split(',')[0]}.mp3`;

      const tags = {
        title: song.name,
        artist: song.primaryArtists,
        // Add more metadata fields as needed
      };

      const metadata = await parseBlob(songBlob);
      metadata.common.title = tags.title;
      metadata.common.artist = tags.artist;

      if (song.image.length > 0) {
        const imageData = await axios.get(song.image[2].link, {
          responseType: 'blob',
        });
        const imageBlob = imageData.data;
        const imageType = imageData.headers['content-type'];
        metadata.common.picture = [
          {
            data: imageBlob,
            format: imageType,
            description: 'Album Cover',
          },
        ];
      }

      const updatedFile = new Blob([songBlob], { type: metadata.type });
      const updatedTags = {
        ...metadata.common,
        ...tags,
      };

      const writer = new ID3Writer(updatedFile);
      writer.setTags(updatedTags);
      writer.addTag();

      const taggedSongBlob = writer.getBlob();
      download(taggedSongBlob, filename);
    } catch (error) {
      console.error('An error occurred while downloading the song:', error);
    }
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
        {song.downloadUrl.map((item, index) => (
          <button key={item.quality} onClick={() => handleDownload(item.link, `downloadButton-${index}`)} id={`downloadButton-${index}`}>
            Download {item.quality}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SongPlayer;
