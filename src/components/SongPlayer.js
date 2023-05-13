import React from 'react';
import download from 'js-file-download';

function Player(props) {
  
  

const SongPlayer = () => {

  const [song, setSong] = useState(null);

  useEffect(() => {

    // Your code to fetch the song data and set it to the state

    // Example code to fetch the song

    const fetchSong = async () => {

      try {

        const response = await fetch('https://saavn.me/songs?id=${id}');

        const data = await response.json();

        setSong(data);

      } catch (error) {

        console.error('An error occurred while fetching the song:', error);

      }

    };

    fetchSong();

  }, []);
  /**
   * Helper function for downloadSong
   * @param {} blob The blobURL of the song.
   * @param {string} filename The name with which to download the file.
   */
  const downloadBlob = (blob, filename) => {
    try {
      download(blob, filename);
      props.setProgress(100);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  /**
   * Starts downloading the song from link sent in props.
   */
  const downloadSong = async () => {
    if (
      !confirm(
        'Please confirm that you understand and agree not to distribute or share the song you are downloading, and not to engage in any form of piracy.\nPlease note that all rights of the song belong to the respective labels and/or JioSaavn, and Tunestation will not be responsible if you are found to be engaged in any form of piracy.\nBy proceeding with the download, you acknowledge and agree to these terms and those stated in the Terms of Use.'
      )
    )
      return false;

    props.showAlert(`Downloading ${props.details.name.replace(/&quot;/g, '"')}...`);
    props.setProgress(10);

    const url = props.details.downloadUrl[4].link;
    const filename = `${props.details.name.replace(/&quot;/g, '"')} - ${props.details.primaryArtists.split(',')[0]}.m4a`;

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      let blobUrl = window.URL.createObjectURL(blob);
      downloadBlob(blobUrl, filename);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  return (
    
    <div>
      <h1>{song.name}</h1>
      <audio controls>
        <source src={song.url} type="audio/mp3" />
      </audio>
      {/* Your component JSX */}
      <button onClick={downloadSong}>Download</button>
    </div>
  );
}

export default Player;
