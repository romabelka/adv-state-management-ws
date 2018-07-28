import React, { Component } from 'react'
import {connect} from 'react-redux'
import Movie from './movie'
import Loader from './loader'
import {loadingSelector, movieListSelector} from "../ducks/movies";

@connect(
    state => ({
        loading: loadingSelector(state),
        movies: movieListSelector(state)
    })
)
class MovieList extends Component {
    static propTypes = {

    }

    render() {
        if (this.props.loading) return <Loader />
        return (
            <div>
                {this.movieItems}
            </div>
        )
    }

    get movieItems() {
        return this.props.movies.map(movie => <Movie key = {movie.title} movie = {movie}/>)
    }
}

export default MovieList