const MusicSearch = () => {
  const [songName, setSongName] = useState('');
  const [results, setResults] = useState([]);
  const [popupSong, setPopupSong] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (event) => {
    setSongName(event.target.value);
  };

  const searchSongs = () => {
    const apiUrl = process.env.REACT_APP_API_URL; // Replace with your API URL from the .env file

    const encodedSongName = encodeURIComponent(songName);
    const url = `${apiUrl}/search/songs?query=${encodedSongName}&page=1&limit=25`;

    axios.get(url)
      .then((response) => {
        const data = response.data;

        if (data && data.data && data.data.results && data.data.results.length > 0) {
          setResults(data.data.results);
        } else {
          setResults([]);
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        setResults([]);
      });
  };

  const showDownloadPopup = (song) => {
    setPopupSong(song);
    setShowPopup(true);
  };

  const closeDownloadPopup = () => {
    setShowPopup(false);
  };

  const acceptCookies = () => {
    // Handle accepting cookies
  };

  return (
    <div>
      <h1>Music Search</h1>
      <input type="text" value={songName} onChange={handleInputChange} placeholder="Enter a song name" />
      <button onClick={searchSongs}>Search</button>

      <div id="results">
        {results.length > 0 ? (
          results.map((song) => (
            <div className="song" key={song.id}>
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

      {showPopup && popupSong && (
        <div id="popup">
          <div id="popup-content">
            <h2 id="popup-title">{popupSong.name}</h2>
            <div id="popup-download-buttons">
              {popupSong.downloadUrl.map((download) => (
                <a className="popup-download-button" href={download.link} key={download.quality}>
                  {download.quality}
                </a>
              ))}
            </div>
            <button onClick={closeDownloadPopup}>Close</button>
          </div>
        </div>
      )}

      {/* Cookie popup */}
      <div id="cookie-popup">
        <div id="cookie-popup-content">
          <div id="cookie-popup-message">
            This site is under construction, currently download in mp4 format, you can rename it to
               m4a/mp3 format
             </div>
             <button id="cookie-popup-accept" onClick={acceptCookies}>Ok</button>
           </div>
         </div>
       </div>
     );
   };

   export default MusicSearch;
