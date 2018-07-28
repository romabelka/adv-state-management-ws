import React, { Component } from 'react'
import {observer} from 'mobx-react'
import './movie.css'

@observer
class Movie extends Component {
    static propTypes = {

    }

    render() {
        const { title, releaseDate, storyline, posterurl, likes, dislikes } = this.props.movie
        return (
            <div className="movie">
                <div className="movie--img">
                    <img src={posterurl} />
                </div>
                <div className="movie--info">
                    <h3>{title}</h3>
                    <h4>{releaseDate}</h4>
                    <section>
                        {storyline}
                    </section>
                    <div className="movie--likes">
                        <button className="btn btn-success"
                            onClick = {this.handleLike}
                        >
                            like: {likes}
                        </button>
                        <button className="btn btn-danger">dislike: {dislikes}</button>
                    </div>
                    <button className="btn btn-primary">hide details</button>
                    <div className="movie--more">
                        <div>
                            <h5>Genres</h5>
                            <ul>
                                {this.genres}
                            </ul>
                        </div>
                        <div>
                            <h5>Actors</h5>
                            <ul>
                                {this.actors}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handleLike = () => this.props.movie.like()

    get genres() {
        return this.props.movie.genres.map((genre, i) => <li key = {i}>{genre}</li>)
    }

    get actors() {
        const { actors = [] } = this.props.movie
        return actors.map((actor, i) => <li key={i}>{actor}</li>)
    }
}

export default Movie