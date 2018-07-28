import {put, select, call} from 'redux-saga/effects'
import {fetchAllSaga, FETCH_ALL_START, loadingSelector, FETCH_ALL_SUCCESS} from './movies'
import moviesService from '../services/movies'
import movieList from '../movies'

const movies = movieList.reduce((acc, m, id) => ({
    ...acc,
    [id]: {...m, id}
}), {})

describe('movies duck', () => {
    it('should fetch all movies', () => {
        const sagaProcess = fetchAllSaga()

        expect(sagaProcess.next().value).toEqual(select(loadingSelector))

        expect(sagaProcess.next(false).value).toEqual(put({ type: FETCH_ALL_START }))

        expect(sagaProcess.next().value).toEqual(call(moviesService.fetchAll))

        expect(sagaProcess.next(movies).value).toEqual(put({ type: FETCH_ALL_SUCCESS, payload: { movies } }))
    });
});