import React, { Component, Fragment } from "react"
import style from "./Calculator.module.scss"
import Input from "./Input"
import Alert from "./Alert"

const decimalToBinary = (number) => {
  let binary = []
  let integerPart = Math.floor(number)
  let decimal = number - integerPart
  while (integerPart > 0) {
    let number1 = integerPart % 2
    binary.unshift(number1)
    integerPart = Math.floor(integerPart / 2)

    if (decimal > 0) {
      binary.push(".")
      let max = 16
      let min = 0

      while (decimal > 0 && min < max) {
        decimal = decimal * 2
        let digit = Math.floor(decimal)
        decimal = decimal - digit
        binary.push(digit)
        min++
      }
    }
  }
  return binary.join("")
}

// 13.625(10) -> 1101.101(2)
const binaryToDecimal = (number) => {
  let arr = number.toString()
  let arrN1 = []
  let arrN2 = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === ".") {
      const mark = i
      for (let z = mark - 1; z >= 0; z--) {
        arrN1.unshift(arr[z])
      }
      for (let k = mark + 1; k < arr.length; k++) {
        arrN2.push(arr[k])
      }
    }
  }
  let sum1 = 0
  let indexArr1 = arrN1.length - 1
  for (let i = 0; i < arrN1.length; i++) {
    sum1 = sum1 + Number(arrN1[i]) * Math.pow(2, indexArr1)
    indexArr1--
  }
  let sum2 = 0
  let indexArr2 = -1
  for (let j = 0; j < arrN2.length; j++) {
    sum2 = sum2 + Number(arrN2[j]) * Math.pow(2, indexArr2)
    indexArr2--
  }
  const res = sum1 + sum2
  return res
}

const decimalToOctal = (number) => {
  let binary = []
  let integerPart = Math.floor(number)
  let decimal = number - integerPart
  while (integerPart > 0) {
    let number1 = integerPart % 8
    binary.unshift(number1)
    integerPart = Math.floor(integerPart / 8)

    if (decimal > 0) {
      binary.push(".")
      let max = 16
      let min = 0

      while (decimal > 0 && min < max) {
        decimal = decimal * 8
        let digit = Math.floor(decimal)
        decimal = decimal - digit
        binary.push(digit)
        min++
      }
    }
  }
  return binary.join("")
}

// 159.8125(10) -> 237.64(8)
const OctalToDecimal = (number) => {
  let arr = number.toString()
  let arrN1 = []
  let arrN2 = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === ".") {
      const mark = i
      for (let z = mark - 1; z >= 0; z--) {
        arrN1.unshift(arr[z])
      }
      for (let k = mark + 1; k < arr.length; k++) {
        arrN2.push(arr[k])
      }
    }
  }
  let sum1 = 0
  let indexArr1 = arrN1.length - 1
  for (let i = 0; i < arrN1.length; i++) {
    sum1 = sum1 + Number(arrN1[i]) * Math.pow(8, indexArr1)
    indexArr1--
  }
  let sum2 = 0
  let indexArr2 = -1
  for (let j = 0; j < arrN2.length; j++) {
    sum2 = sum2 + Number(arrN2[j]) * Math.pow(8, indexArr2)
    indexArr2--
  }
  const res = sum1 + sum2
  return res
}

const convertNumber = (expression, type, number) => {
  const output = Number(number)
  let res
  if (expression === "Cal1") {
    if (type === "b") {
      res = binaryToDecimal(output)
    } else {
      res = decimalToBinary(output) // 13.625
    }
  } else if (expression === "Cal2") {
    if (type === "o") {
      res = OctalToDecimal(output)
    } else {
      res = decimalToOctal(output) // 13.625
    }
  }
  return res
}

class Calculator1 extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: "d", // mac dinh decimal
      number: ""
    }
  }

  handleChange = (type) => (value) => {
    this.setState({
      type,
      number: value
    })
  }

  render() {
    const { type, number } = this.state
    const binary = type === "d" ? convertNumber("Cal1", type, number) : number
    const decimal = type === "b" ? convertNumber("Cal1", type, number) : number
    return (
      <div className={style.container}>
        <div className={style.box}>
          <Input title="Decimal" value={decimal} onHandleChangeValue={this.handleChange("d")} />
          <Input title="Binary" value={binary} onHandleChangeValue={this.handleChange("b")} />
          <Alert alert={binary || decimal} />
        </div>
        <button className={style.button} onClick={this.props.onClick}>
          Decimal-Binary
        </button>
      </div>
    )
  }
}

class Calculator2 extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: "d", // mac dinh decimal
      number: " "
    }
  }

  handleChange = (type) => (value) => {
    this.setState({
      type,
      number: value // setState theo value nhập vào ở props "onHandleChangeValue"
    })
  }

  render() {
    const { type, number } = this.state
    const binary = type === "d" ? convertNumber("Cal2", type, number) : number
    const decimal = type === "o" ? convertNumber("Cal2", type, number) : number
    return (
      <div className={style.container}>
        <div className={style.box}>
          <Input title="Decimal" value={decimal} onHandleChangeValue={this.handleChange("d")} />
          <Input title="Octal" value={binary} onHandleChangeValue={this.handleChange("o")} />
          <Alert alert={binary || decimal} />
        </div>
        <button className={style.button} onClick={this.props.onClick}>
          Decimal-Octal
        </button>
      </div>
    )
  }
}

export class Calculator extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isButton: true
    }
  }

  ChangeCal1 = () => {
    this.setState({
      isButton: false
    })
  }

  ChangeCal2 = () => {
    this.setState({
      isButton: true
    })
  }

  render() {
    const { isButton } = this.state
    return (
      <Fragment>
        {isButton ? <Calculator1 onClick={this.ChangeCal1} /> : <Calculator2 onClick={this.ChangeCal2} />}
      </Fragment>
    )
  }
}

export default Calculator

// Có 2 cách truyền vào
/**
 * ###BMI
 * ở Input thì truyền vô onChange={handleChangeValue("weight")} // ***
 * còn ở Calculator thì lấy props handleChangeValue={this.handleChange}
 * ở đây hàm handleChange thì nó xét cái name truyền vào và name truyền vào ở đây là "weight" từ props và nó setState giá trị
 */

/**
 * ###binaryDecimal
 * ở Input thì truyền vô onChange={this.handleChange} // ***
 * truyền vô hàm handleChange và hàm handleChange chứa props "onHandleChangeValue(e.target.value)" thay đổi giá trị input
 * còn ở Calculator thì lấy props onHandleChangeValue={this.handleChange("d")} và "d" ở đây là type (name)
 * và value là "e.target.value" truyền vào từ props và setState giá trị
 */
