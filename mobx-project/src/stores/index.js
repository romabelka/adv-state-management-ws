import {configure, autorun} from 'mobx'
import MoviesStore from './movies'
import moviesService from '../services/movies'

configure({
    enforceActions: true
})

const stores = {
    movies: new MoviesStore(moviesService)
}

window.stores = stores

autorun(() => {
    console.log('---', 'autorun loading', stores.movies.loading)
})

export default stores
