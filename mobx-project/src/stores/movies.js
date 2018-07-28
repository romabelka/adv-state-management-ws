import {observable, computed, action} from 'mobx'

class MoviesStore {
    constructor(movieService) {
        this.movieService = movieService
        this.movieService.subscribeMoviesChange(this.handleMovieChange)
    }
    @observable movies = {}

    @computed get movieList() {
        return Object.values(this.movies)
    }

    @observable loading = false

    @action fetchAll = () => {
        this.loading = true

        return this.movieService.fetchAll().then(action(movies => {
            Object.values(movies).forEach(
                movie => this.movies[movie.id] = new Movie(movie, this.movieService)
            )
            this.loading = false
        }))
    }

    handleMovieChange = (movie) => this.movies[movie.id].update(movie)

}

class Movie {
    @observable id
    @observable genres = []
    @observable actors = []
    @observable likes
    @observable dislikes
    @observable posterurl
    @observable releaseDate
    @observable title
    @observable storyline


    constructor(movie, movieService) {
        Object.assign(this, movie)
        this.movieService = movieService
    }

    @action like = () => {
        this.movieService.likeMovie(this)
    }

    @action update = (data) => {
        Object.assign(this, data)
    }
}

export default MoviesStore