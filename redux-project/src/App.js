import React, { Component } from 'react';
import {Provider} from 'react-redux'
import MovieList from './components/movie-list'
import 'bootstrap/dist/css/bootstrap.css'
import store from './redux/store'

class App extends Component {
  render() {
    return (
        <Provider store = {store}>
          <div>
              <MovieList />
          </div>
        </Provider>
    );
  }
}

export default App;
