       import React, { useState } from 'react';
import axios from 'axios';

const MusicSearch = () => {
  const [songInput, setSongInput] = useState('');
  const [results, setResults] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupDownloadButtons, setPopupDownloadButtons] = useState([]);
  const [searching, setSearching] = useState(false);
  const [backgroundMusic, setBackgroundMusic] = useState(null);

  const searchSongs = async () => {
    if (songInput.trim() === '') {
      return;
    }

    setSearching(true);

    const apiUrl = `https://down-spot.vercel.app/search/songs?query=${encodeURIComponent(
      songInput
    )}&page=1&limit=25`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (data && data.data && data.data.results && data.data.results.length > 0) {
        setResults(data.data.results);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  const playMusic = (url) => {
    const url96kbps = url.replace('/128/', '/96/');
    setBackgroundMusic(new Audio(url96kbps));
    backgroundMusic.play();
  };

  const showDownloadPopup = (song) => {
    const downloadUrls = song.more_info.encrypted_media_urls;

    const downloadButtons = Object.entries(downloadUrls).map(([quality, url]) => {
      return (
        <button key={quality} className="download-button" onClick={() => window.open(url, '_blank')}>
          Download {quality}
        </button>
      );
    });

    setPopupTitle(song.title);
    setPopupDownloadButtons(downloadButtons);
    setPopupVisible(true);
  };

  const closeDownloadPopup = () => {
    setPopupVisible(false);
  };

  return (
    <div>
      <center>
        <h1>Music Search</h1>
        <input
          type="text"
          id="songInput"
          placeholder="Enter a song name"
          value={songInput}
          onChange={(e) => setSongInput(e.target.value)}
        />
        <button onClick={searchSongs} disabled={searching}>
          {searching ? (
            <span
              style={{
                animation: 'blink-animation 1s infinite',
              }}
            >
              Searching...
            </span>
          ) : (
            'Search'
          )}
        </button>

        <div id="results">
          {results.map((song) => (
            <div key={song.id} className="song">
              <img src={song.image[2].link} alt="Thumbnail" />
              <p>{song.name}</p>
              <p>{song.primaryArtists}</p>
              <button
                className="play-button"
                onClick={() => playMusic(song.url)}
                style={{ float: 'left' }}
              >
                Play
              </button>
              <div style={{ float: 'right' }}>
                {song.downloadUrl.map((item) => (
                  <button
                    key={item.quality}
                    className="download-button"
                    onClick={() => window.open(item.link, '_blank')}
                  >
                    Download {item.quality}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        

{popupVisible && (
          <div id="popup">
            <div id="popup-content">
              <h2 id="popup-title">{popupTitle}</h2>
              <div id="popup-download-buttons">{popupDownloadButtons}</div>
              <button onClick={closeDownloadPopup}>Close</button>
            </div>
          </div>
        )}

        {backgroundMusic && (
          <audio autoPlay>
            <source src={backgroundMusic.src} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </center>
    </div>
  );
};

export default MusicSearch;
