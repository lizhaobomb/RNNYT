import {createStore, applyMiddleware, combineReducers} from 'redux'
import createLogger from 'redux-logger'
import promiseMiddleware from 'redux-promise'

import newsFeedReducer from './reducers/newsFeedReducer'
import searchTermReducer from './reducers/searchTermReducer'
import navigationReducer from './reducers/navigationReducer'

const logger = createLogger()

export default (initialState = {}) => (
  createStore(
    combineReducers({
      news: newsFeedReducer,
      searchTerm: searchTermReducer,
      navigation: navigationReducer
    }),
    initialState,
    applyMiddleware(logger, promiseMiddleware)
  )
)
