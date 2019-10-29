import React from 'react';
import './App.css';
import films from './components/data/films.json';
import tags from './components/data/tags.json';
import {BrowserRouter} from 'react-router-dom';
import Header from './components/Header/Header';


function App() {
  return (
    <BrowserRouter>
      <div className='main-content'>
        <Header
          films={films} 
          tags={tags} 
        />
      </div>
    </BrowserRouter>
    );
}

export default App;