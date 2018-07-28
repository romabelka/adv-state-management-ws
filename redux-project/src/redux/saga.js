import { fork } from 'redux-saga/effects'
import {saga as moviesSaga} from '../ducks/movies'

export default function * () {
    yield fork(moviesSaga)
}