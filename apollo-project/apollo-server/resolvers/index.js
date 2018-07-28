const movies = require('../fixtures/movies')
const actors = require('../fixtures/actors')
const genres = require('../fixtures/genres')

export default {
    Query: {
        genres: autoResolve(() => Object.values(genres)),
        movies: autoResolve(() => Object.values(movies)),
        movie: autoResolve((_, { id }) => movies[id]),
        paginatedMovies: autoResolve((_, { offset = 0, limit }) => Object.values(movies).slice(offset, offset + limit))
    },
    Movie: {
        actors: autoResolve((movie) => movie.actors.map(id => actors[id])),
        genres: (movie) => movie.genres.map(id => genres[id])
    },
    Genre: {
        movies: (genre) => Object.values(movies).filter(movie => movie.genres.includes(genre.id))
    },
    Mutation: {
        likeMovie: autoResolve((_, { id }) => {
            const movie = movies[id]
            movie.likes++
            return movie
        }),
        dislikeMovie: autoResolve((_, { id }) => {
            const movie = movies[id]
            movie.dislikes++
            return movie
        })
    }
}

function autoResolve(func, timeout = 2000) {
    return (...args) => new Promise(resolve => setTimeout(() => resolve(func(...args)), timeout))
}