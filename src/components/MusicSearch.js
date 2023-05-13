import React, { useState } from 'react';

import axios from 'axios';

const MusicSearch = () => {

  const [songInput, setSongInput] = useState('');

  const [results, setResults] = useState([]);

  const [popupVisible, setPopupVisible] = useState(false);

  const [popupTitle, setPopupTitle] = useState('');

  const [popupDownloadButtons, setPopupDownloadButtons] = useState([]);

  const [cookieAccepted, setCookieAccepted] = useState(false);

  const searchSongs = () => {

    const apiUrl = `https://saavn.me/search/songs?query=${encodeURIComponent(songInput)}&page=1&limit=25`;

    axios

      .get(apiUrl)

      .then(response => {

        const data = response.data;

        if (data && data.data && data.data.results && data.data.results.length > 0) {

          setResults(data.data.results);

        } else {

          setResults([]);

        }

      })

      .catch(error => {

        console.error("An error occurred:", error);

        setResults([]);

      });

  };

  const showDownloadPopup = (song) => {

    setPopupTitle(song.name);

    setPopupDownloadButtons(song.downloadUrl);

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

            <div id="cookie-popup-message">

              This site is under construction, currently download in mp4 format, you can rename it to m4a/mp3 format

            </div>

            <button id="cookie-popup-accept" onClick={acceptCookies}>Ok</button>

          </div>

        </div>

      )}

      <h1>Music Search</h1>

      <input type="text" id="songInput" placeholder="Enter a song name" value={songInput} onChange={(e) => setSongInput(e.target.value)} />

      <button onClick={searchSongs}>Search</button>

      <div id="results">

        {results.length > 0 ? (

          results.map((song) => (

            <div key={song.id} className="song">

              <img src={song.image[2].link} alt="Thumbnail" />

              <p>{song.name}</p>

              <p>{song.primaryArtists}</p>

              <button onClick={() => showDownloadPopup(song)}>Download</button>

            </div>

          ))

        ) : (

          <p>No results found.</p>

        )}

      </div>

      {popupVisible && (

        <div id="popup">

          <div id="popup-content">

            <h2 id="popup-title">{popupTitle}</h2>

            <div id="popup-download-buttons">

              {popupDownloadButtons.map((download, index) => (

                <a key={index} className="popup-download-button" href={download.link}>

                  {download.quality}

                </a>

              ))}

            </div>

            <button onClick={closeDownloadPopup}>Close</button>

          </div>

        </div>

      )}

    </div>

  );

};

export default MusicSearch;

