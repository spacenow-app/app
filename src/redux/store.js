import { createStore, compose, applyMiddleware } from 'redux'
// import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers'

// export const history = createHistory()

const logger = createLogger({
  collapsed: true
})

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(logger)
);

// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(logger)
// }

export const store = createStore(reducers, enhancer)
