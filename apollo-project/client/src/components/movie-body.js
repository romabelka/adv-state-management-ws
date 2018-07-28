import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MovieBody extends Component {
    static propTypes = {

    }

    render() {
        const { storyline, likes, dislikes } = this.props.movie
        return (
            <div>
                <section>
                    {storyline}
                </section>
                <button>likes: {likes}</button>
                <button>dislikes: {dislikes}</button>
                <ul>
                    {this.actors}
                </ul>
                <ul>
                    {this.genres}
                </ul>
            </div>
        )
    }

    get actors() {
        return this.props.movie.actors.map(actor => <li key={actor.id}>{actor.name}</li>)
    }
    get genres() {
        return this.props.movie.genres.map(genre => <li key={genre.id}>{genre.name}</li>)
    }
}

export default MovieBody