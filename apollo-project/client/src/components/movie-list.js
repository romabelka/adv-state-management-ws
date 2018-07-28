import React, { Component } from 'react'
import {Query} from 'react-apollo'
import Loader from './loader'
import Movie from './movie'
import moviesQuery from '../graphql/movies-query.graphql'

class MovieList extends Component {
    static propTypes = {

    }

    render() {
        return (
            <Query query={moviesQuery}>
                {
                    ({ data, loading, error }) => {
                        if (loading) return <Loader/>
                        if (error) return <h1>Error</h1>

                        return data.movies.map(movie => (<Movie movie = {movie} key = {movie.id}/>))
                    }
                }
            </Query>
        )
    }
}

export default MovieList