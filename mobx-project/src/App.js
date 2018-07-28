import React, { Component } from 'react';
import MovieList from './components/movie-list'
import movies from './movies'
import 'bootstrap/dist/css/bootstrap.css'

class App extends Component {
  render() {
    return (
      <div>
          <MovieList movies = {movies}/>
      </div>
    );
  }
}

export default App;
