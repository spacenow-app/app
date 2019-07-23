import { createStore, applyMiddleware } from 'redux'
// import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers'

// export const history = createHistory()

const logger = createLogger({
  collapsed: true
})

const middlewares = [thunk]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

export const store = createStore(reducers, applyMiddleware(...middlewares))
