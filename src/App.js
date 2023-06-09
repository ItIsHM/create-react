import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import MusicSearch from './components/MusicSearch';
import SongPlayer from './components/SongPlayer';
import Home from './components/MusicPage';

const App = () => {
  const [progress, setProgress] = useState(0);

  return (
    <>
      <LoadingBar
        color='#1DB954'
        progress={progress}
        height={3}
        shadow={false}
        onLoaderFinished={() => setProgress(0)}
      />
      <Router>
        <Routes>
          <Route path='/Search' element={<Home />} />
          <Route path='/' element={<MusicSearch />} />
          <Route path='/song/:id' element={<SongPlayer />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
