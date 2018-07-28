import React, { Component } from 'react'
import {Mutation} from 'react-apollo'
import likeMovie from '../graphql/like-movie-mutation.graphql'

class MovieBody extends Component {
    static propTypes = {

    }

    render() {
        const { storyline, likes, dislikes, id } = this.props.movie
        return (
            <div>
                <section>
                    {storyline}
                </section>
                <Mutation mutation={likeMovie}
                          variables={{ id }}
                          optimisticResponse={
                              {"likeMovie":{id, "likes": likes + 1,"__typename":"Movie"}}
                          }
                >
                    {(like, { loading }) =>
                        <button onClick={like}>likes: {likes} {loading ? 'loading' : ''}</button>
                    }
                </Mutation>
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