import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import createSagaMiddleware from 'redux-saga'
import saga from './saga'

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(sagaMiddleware)

const store = createStore(reducer, enhancer)

sagaMiddleware.run(saga)

window.store = store

export default store