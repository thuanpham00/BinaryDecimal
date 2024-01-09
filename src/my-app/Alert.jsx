import React, { Component } from "react"
import style from "styled-components"

export class Alert extends Component {
  render() {
    const { alert } = this.props
    return <div>{alert !== " " || alert > 0 ? "Đã chuyển thành công" : "Chưa chuyển thành công"}</div>
  }
}

export default Alert
