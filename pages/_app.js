import { createGlobalStyle, ThemeProvider } from 'styled-components'

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

const theme = {
  colors: {
    primary: '#5FB37D',
    neon_green: '#66FFAC',
    light_green: '#A4FFC5',
    deep_red: '#B3423D',
    pale_pink: '#FFCAC7',
    background: '#f2f2f2'
  },
}

function MyApp({ Component, pageProps }) {
  return  (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
