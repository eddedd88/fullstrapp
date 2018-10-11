import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import addToHomeScreen from './addToHomeScreen'
import { BrowserRouter } from 'react-router-dom'

// material ui theme
import theme from './styles/theme'

// fonts - material ui was built with roboto in mind
// import 'typeface-roboto'

// some global css
import './index.css'

ReactDOM.render(
  <StrictMode>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </StrictMode>,
  document.getElementById('root')
)

addToHomeScreen()
serviceWorker.register()
