/* eslint-disable import/prefer-default-export */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducers from './reducers'

let middlewares = [thunk]

if (process.env.PLAYGROUND === true) {
  const logger = createLogger({ collapsed: true })
  middlewares = [...middlewares, logger]
}

export const store = createStore(reducers, applyMiddleware(...middlewares))
