import React, { Component } from 'react'
import {observer} from 'mobx-react'
import Movie from './movie'
import Loader from './loader'
import stores from '../stores'

@observer
class MovieList extends Component {
    static propTypes = {

    }

    componentDidMount() {
        stores.movies.fetchAll()
    }

    render() {
        if (stores.movies.loading) return <Loader />
        return (
            <div>
                {this.movieItems}
            </div>
        )
    }

    get movieItems() {
        console.log('---', stores.movies.movieList)
        return stores.movies.movieList.map(movie => <Movie key = {movie.title} movie = {movie}/>)
    }
}

export default MovieList