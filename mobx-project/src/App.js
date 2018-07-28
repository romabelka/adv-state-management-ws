import React, { Component } from 'react';
import {Provider} from 'mobx-react'
import MovieList from './components/movie-list'
import 'bootstrap/dist/css/bootstrap.css'
import stores from "./stores";

class App extends Component {
  render() {
    return (
        <Provider {...stores}>
          <div>
              <MovieList />
          </div>
        </Provider>
    );
  }
}

export default App;
