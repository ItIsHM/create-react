import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MusicSearch from './components/MusicSearch';
import SongPlayer from './components/SongPlayer';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MusicSearch} />
        <Route path="/song/:id" component={SongPlayer} />
      </Switch>
    </Router>
  );
};

export default App;
