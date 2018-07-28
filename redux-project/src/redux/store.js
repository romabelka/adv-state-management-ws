import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import saga from './saga'

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(sagaMiddleware, logger)

const store = createStore(reducer, enhancer)

sagaMiddleware.run(saga)

window.store = store

export default store