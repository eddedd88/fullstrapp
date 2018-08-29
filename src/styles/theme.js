import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

// https://material-ui.com/customization/themes/#themes

const theme = createMuiTheme({
  palette: {
    // primary: color1,
    // secondary: color2,
    // error: color3
  },
  typography: {
    fontSize: 16,
    subheading: {
      fontSize: '1.2rem'
    }
  }
})

export default theme
