import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

/*
Remove that to production
*/
document.cookie =
  'id_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYwODg5ZTUwLTYwNTYtMTFlOS05OTE3LTdmMTUxYWI3NjBhNCIsImVtYWlsIjoiYnJ1bm9Ac3BhY2Vub3cuY29tIiwiaWF0IjoxNTY1MTQ3MjMxLCJleHAiOjE1ODA2OTkyMzF9.crty0VSrp5BBRPjpAK-bmAJLmWNV2wy35NwiM9EJWJk'

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
