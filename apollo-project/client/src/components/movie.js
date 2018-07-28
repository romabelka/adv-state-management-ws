import React, { Component } from 'react'
import {Query} from 'react-apollo'
import Loader from './loader'
import MovieBody from './movie-body'
import movieQuery from '../graphql/movie-query.graphql'

class Movie extends Component {
    static propTypes = {

    }

    state = {
        isOpen: false
    }

    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen })

    render() {
        const { movie } = this.props
        return (
            <div>
                <h3 onClick = {this.toggleOpen}>{movie.title}</h3>
                {this.advancedSection}
            </div>
        )
    }

    get advancedSection() {
        if (!this.state.isOpen) return null

        const { id } = this.props.movie

        return (
            <Query query={movieQuery} variables={{ id }}>
                {
                    ({ data, loading }) => {
                        if (!data || loading) return <Loader />

                        return <MovieBody movie = {data.movie} />
                    }
                }
            </Query>
        )
    }
}

export default Movie