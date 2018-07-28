import {observable, computed, action} from 'mobx'

class MoviesStore {
    constructor(movieService) {
        this.movieService = movieService
    }
    @observable movies = {}

    @computed get movieList() {
        return Object.values(this.movies)
    }

    @observable loading = false

    @action fetchAll = () => {
        this.loading = true

        return this.movieService.fetchAll().then(action(movies => {
            this.movies = movies
            this.loading = false
        }))
    }

}

export default MoviesStore