import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import MusicSearch from './components/MusicSearch';
import SongPlayer from './components/SongPlayer';

const App = () => {
  return (
    <Router>
     
      <Routes>
        
        <Route path='/' element={<MusicSearch/>} />
        
        <Route path='/song/:id' element={<SongPlayer/>} />
            </Routes>
          
    </Router>
  );
};

export default App;
