import React, { Component, Fragment, ChangeEvent } from 'react'
import Paper from '@material-ui/core/Paper'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Toolbar from '@material-ui/core/Toolbar'
import ClearIcon from '@material-ui/icons/Clear'
import Transition, { TransitionStatus } from 'react-transition-group/Transition'

const transitionTimeout: number = 100
const defaultStyle = {
  transition: `opacity ${transitionTimeout}ms linear`,
  opacity: 0,
  width: '100%',
  position: 'absolute',
  left: 0,
  overflow: 'hidden',
  pointerEvents: 'none'
}

const transitionStyles: { [key in TransitionStatus]?: any } = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1,
    pointerEvents: 'auto'
  }
}

type Props = {
  placeholder: string
  onChangeValue: (value: string) => void
}

type State = {
  value: string
  searchModeOn: boolean
}

class ExpandableSearch extends Component<Props, State> {
  state = {
    value: '',
    searchModeOn: false
  }

  searchInput?: HTMLInputElement

  setSearchInputRef = (element: HTMLInputElement) => {
    this.searchInput = element
  }

  handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value

    this.setState({
      value
    })

    this.props.onChangeValue(value)
  }

  toggleSearchMode = () => {
    const { onChangeValue } = this.props
    const searchModeOn: boolean = !this.state.searchModeOn

    this.setState({
      value: '',
      searchModeOn
    })

    if (searchModeOn && this.searchInput) {
      this.searchInput.focus()
    } else {
      onChangeValue('')
    }
  }

  handleClickClear = () => {
    this.setState({
      value: ''
    })
    this.props.onChangeValue('')
    if (this.searchInput) {
      this.searchInput.focus()
    }
  }

  render() {
    const { placeholder } = this.props

    const { value, searchModeOn } = this.state

    return (
      <Fragment>
        <IconButton color="inherit" onClick={this.toggleSearchMode}>
          <SearchIcon />
        </IconButton>

        <Transition in={searchModeOn} timeout={transitionTimeout}>
          {(transitionState: TransitionStatus) => (
            <Paper
              square
              elevation={1}
              color="inherit"
              style={{
                ...defaultStyle,
                ...transitionStyles[transitionState]
              }}
            >
              <Toolbar disableGutters>
                <IconButton onClick={this.toggleSearchMode}>
                  <ArrowBackIcon />
                </IconButton>
                <Input
                  type="search"
                  placeholder={placeholder}
                  fullWidth
                  disableUnderline
                  value={value}
                  onChange={this.handleValueChange}
                  inputRef={this.setSearchInputRef}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Clear search query"
                        onClick={this.handleClickClear}
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Toolbar>
            </Paper>
          )}
        </Transition>
      </Fragment>
    )
  }
}

export default ExpandableSearch
