import React, { Component } from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import Loader from './loader'
import Movie, {MovieFragment} from './movie'

const query = gql`
    query {
        movies {
            id
            ...MovieFragment
        }
    }
    
    ${MovieFragment}
`

class MovieList extends Component {
    static propTypes = {

    }

    render() {
        return (
            <Query query={query}>
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