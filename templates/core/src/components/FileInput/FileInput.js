import React, { Component } from 'react'
import type { Node } from 'react'
type Props = {
  children: Node
}

class FileInput extends Component<Props> {
  render() {
    const { children, ...rest } = this.props

    return (
      <label>
        <input {...rest} type="file" hidden />
        {children}
      </label>
    )
  }
}

export default FileInput
