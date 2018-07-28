//import {all} from 'redux-saga/effects'
import {createSelector} from 'reselect'
import {appName} from '../config'
import {Record, OrderedMap} from 'immutable'
import movieList from '../movies'
import moviesService from '../services/movies'

const movies = movieList.reduce((acc, m, id) => ({
    ...acc,
    [id]: {...m, id}
}), {})

/**
 * Constants
 * */
export const moduleName = 'movies'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`
export const FETCH_ALL_FAIL = `${prefix}/FETCH_ALL_FAIL`

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

export function fetchAllMovies() {
    return (dispatch) => {
        dispatch({
            type: FETCH_ALL_START
        })

        moviesService.fetchAll()
            .then(movies => dispatch({
                type: FETCH_ALL_SUCCESS,
                payload: {movies}
            }))
            .catch(error => dispatch({
                type: FETCH_ALL_FAIL,
                error
            }))
    }
}

/**
 * Sagas
 * */

/*
export function* saga() {
    yield all([

    ])
}*/
