import React, { Component } from 'react'

export const MovieFragment = `
fragment MovieFragment on Movie {
    title
}
`

class Movie extends Component {
    static propTypes = {

    }

    render() {
        const { movie } = this.props
        return (
            <div>
                <h3>{movie.title}</h3>
            </div>
        )
    }
}

export default Movie