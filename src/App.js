import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { store } from './redux/store'
import Routes from './routes'
import { global as GlobalStyle, theme } from './styles'

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Routes />
        </>
      </ThemeProvider>
    </Provider>
  )
}

export default App
