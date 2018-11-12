import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/App'
import * as serviceWorker from './serviceWorker'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import addToHomeScreen from './addToHomeScreen'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

// material ui theme
import theme from './theme'

// fonts - material ui was built with roboto in mind
// import 'typeface-roboto'

// some global css
import './index.css'

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root')
)

addToHomeScreen()
serviceWorker.register()
