import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import MusicSearch from './components/MusicSearch';
import SongPlayer from './components/SongPlayer';

const App = () => {
  return (
    <Router>
      <Switch>
        
        <Route path='/' element={<MusicSearch/>} />
        
        <Route path='/song/:id' element={<SongPlayer/>} />
      </Switch>
    </Router>
  );
};

export default App;
