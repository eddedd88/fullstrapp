import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { MuiThemeProvider } from 'material-ui/styles'

// material ui theme
import theme from './styles/theme'

// fonts - material ui was built with roboto in mind
import 'typeface-roboto'

// tachyons - for atomic css
// consider using Material UI built-in typography
import 'tachyons/css/tachyons.min.css'

// some global css
import './index.css'

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
)

registerServiceWorker()
