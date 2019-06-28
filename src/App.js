import React from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Routes from './routes'
import { GlobalStyle } from './styles'

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Routes />
    </Provider>
  )
}

export default App
