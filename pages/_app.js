import { createGlobalStyle, ThemeProvider } from 'styled-components'
import {AuthProvider} from '../config/auth'
import {Basket} from '../config/basket_context'
import {theme} from '../config/theme'


const GlobalStyle = createGlobalStyle`

* {
    box-sizing: border-box;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  *::-webkit-scrollbar {
    display: none;
  }

  html {
    font-size: 20px;
    line-height:  1.4;
  }

  body {
    font-family: "Roboto", Helvetica, Sans-Serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
`

function MyApp({ Component, pageProps }) {
  return  (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyle />
        <Basket>
          <Component {...pageProps} />
        </Basket>  
      </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp
