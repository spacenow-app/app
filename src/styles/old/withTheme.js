import React, { Fragment } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import defaultTheme from './default-theme'
// import { ThemeConsumer } from './themeContext'
import MontserratRegular from './default-theme/lib/fonts/Montserrat/Montserrat-Regular.ttf'
import MontserratMedium from './default-theme/lib/fonts/Montserrat/Montserrat-Medium.ttf'
import MontserratBold from './default-theme/lib/fonts/Montserrat/Montserrat-Bold.ttf'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat-Regular';

    @font-face{
      font-family: 'Montserrat-Regular';
      src: url(${MontserratRegular});
    }
    @font-face{
      font-family: 'Montserrat-Medium';
      src: url(${MontserratMedium});
    }
    @font-face{
      font-family: 'Montserrat-Bold';
      src: url(${MontserratBold});
    }
  }

`

const withTheme = WrappedComponent => {
  // const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  return props => {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Fragment>
          <GlobalStyle />
          <WrappedComponent {...props} />
        </Fragment>
      </ThemeProvider>
    )
  }
}

export default withTheme
