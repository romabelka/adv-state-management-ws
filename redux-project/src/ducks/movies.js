import {put, call, all, select, takeEvery, take} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'
import {createSelector} from 'reselect'
import {appName} from '../config'
import {Record, OrderedMap} from 'immutable'
import moviesService from '../services/movies'

/**
 * Constants
 * */
export const moduleName = 'movies'
const prefix = `${appName}/${moduleName}`

export const LIKE_MOVIE_REQUEST = `${prefix}/LIKE_MOVIE_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`
export const FETCH_ALL_FAIL = `${prefix}/FETCH_ALL_FAIL`
export const MOVIE_CHANGED = `${prefix}/MOVIE_CHANGED`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    loading: false,
    entities: new OrderedMap()
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case FETCH_ALL_START:
            return state.set('loading', true)

        case FETCH_ALL_SUCCESS:
            return state
                .set('loading', false)
                .set('entities', new OrderedMap(payload.movies))

        case MOVIE_CHANGED:
            return state.setIn(['entities', payload.movie.id], payload.movie)

        default:
            return state
    }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const loadingSelector = createSelector(stateSelector, state => state.loading)
export const movieListSelector = createSelector(stateSelector, state => state.entities.valueSeq().toArray())

/**
 * Action Creators
 * */

export function likeMovie(movie) {
    return {
        type: LIKE_MOVIE_REQUEST,
        payload: { movie }
    }
}

/**
 * Sagas
 * */

export function * fetchAllSaga() {
    const isLoading = yield select(loadingSelector)
    if (isLoading) return

    yield put({
        type: FETCH_ALL_START
    })

    try {
        const movies = yield call(moviesService.fetchAll)

        yield put({
            type: FETCH_ALL_SUCCESS,
            payload: {movies}
        })
    } catch (error) {
        yield put({
            type: FETCH_ALL_FAIL,
            error
        })
    }

}

function * likeMovieSaga({ payload }) {
    yield call(moviesService.likeMovie, payload.movie)
}

const createSubscribeChanel = () => eventChannel((emit) => moviesService.subscribeMoviesChange(emit))

function* subscribtionSaga() {
    const channel = yield call(createSubscribeChanel)

    while (true) {
        const movie = yield take(channel)

        yield put({
            type: MOVIE_CHANGED,
            payload: {movie}
        })
    }
}

export function* saga() {
    yield all([
        fetchAllSaga(),
        takeEvery(LIKE_MOVIE_REQUEST, likeMovieSaga),
        subscribtionSaga()
    ])
}
