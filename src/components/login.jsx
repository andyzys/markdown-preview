import React from 'react'
require('./login.less');

const USERNAME = 'admin'
const PASSWORD = '123456'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      passpord: '',
    }
  }
  render() {
    return (
      <div className="login-container">
        <div  className="input-container">
          <input
            type="text"
            ref="username"
            placeholder="请输入用户名"
            className="username-input"
            value={this.state.username}
            onChange={this.usernameChange.bind(this)}/>
          <input
            ref="password"
            type="password"
            placeholder="请输入密码"
            className="username-pwd"
            value={this.state.passpord}
            onChange={this.pwdChange.bind(this)}/>
          <button onClick={this.handleSubmit.bind(this)} className="input-submit">登录</button>
      </div>
      </div>
    )
  }
  handleSubmit() {
    if(this.state.username != USERNAME || this.state.passpord != PASSWORD) {
      alert('用户名密码错误！请重试')
      this.setState({
        username: '',
        passpord: ''
      })
    } else {
      this.props.changeLoginState(true)
    }

  }
  usernameChange(e) {
    this.setState({
      username: this.refs['username'].value
    })
  }
  pwdChange(e) {
    this.setState({
      passpord: this.refs['password'].value
    })
  }
}
