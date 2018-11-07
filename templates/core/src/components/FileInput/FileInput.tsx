import React, { Component, HTMLProps } from 'react'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
} & HTMLProps<HTMLInputElement>

class FileInput extends Component<Props> {
  render() {
    const { children, ...rest } = this.props

    return (
      <label>
        <input {...rest} type='file' hidden />
        {children}
      </label>
    )
  }
}

export default FileInput
