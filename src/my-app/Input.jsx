import React, { Component } from "react"
import style from "./Input.module.scss"

export class Input extends Component {
  handleChange = (e) => {
    this.props.onHandleChangeValue(e.target.value)
  }

  render() {
    const { title, value } = this.props
    return (
      <div className={style.input}>
        <fieldset>
          <legend className={style.title}>
            Enter your in <strong>{title}</strong>
          </legend>
          <input className={style.input} type="text" value={value} onChange={this.handleChange} />
        </fieldset>
      </div>
    )
  }
}

export default Input
