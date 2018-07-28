import React, { Component } from 'react'
import {ApolloProvider} from 'react-apollo'
import client from './apollo'
import MovieList from './components/movie-list'

class App extends Component {
    static propTypes = {

    }

    render() {
        return (
            <ApolloProvider client={client}>
                <div>
                    <MovieList />
                </div>
            </ApolloProvider>
        )
    }
}

export default App