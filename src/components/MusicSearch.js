import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MusicSearch = () => {
  const [songInput, setSongInput] = useState('');
  const [results, setResults] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupDownloadButtons, setPopupDownloadButtons] = useState([]);
  const [cookieAccepted, setCookieAccepted] = useState(false);

  const searchSongs = async () => {
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
    }
  };

  const showDownloadPopup = (song) => {
    const downloadUrls = song.more_info.encrypted_media_urls;

    const downloadButtons = Object.entries(downloadUrls).map(([quality, url]) => {
      return (
        <button
          key={quality}
          className="popup-download-button"
          onClick={() => window.open(url, '_blank')}
        >
          {quality}
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

  const acceptCookies = () => {
    setCookieAccepted(true);
  };

  return (
    <div>
      {!cookieAccepted && (
        <div id="cookie-popup">
          <div id="cookie-popup-content">
            <div id="cookie-popup-message">Made with ♥️ by HM</div>
          </div>
        </div>
      )}

      <center>
        <h1>Music Search</h1>
        <input
          type="text"
          id="songInput"
          placeholder="Enter a song name"
          value={songInput}
          onChange={(e) => setSongInput(e.target.value)}
        />
        <button onClick={searchSongs}>Search</button>

        <div id="results">
          {results.map((song) => (
            <div key={song.id} className="song">
              <img src={song.image[2].link} alt="Thumbnail" />
              <p>{song.name}</p>
              <p>{song.primaryArtists}</p>
              <Link
                to={`/song/${song.id}`}
                style={{
                  backgroundColor: '#1DB954',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  margin: '4px',
                  fontSize: '14px',
                  textDecoration: 'none',
                }}
              >
                Download
              </Link>
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
                  </center>
     </div>
     )}
    </div>
  );
};

export default MusicSearch;

