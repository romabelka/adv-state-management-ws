import {combineReducers} from 'redux'
import movieReducer, {moduleName as movieModule} from '../ducks/movies'

export default combineReducers({
    [movieModule]: movieReducer
})