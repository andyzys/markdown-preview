import React from 'react';
import MarkDownPreview from './components/markDownPreview';
import Login from './components/login';

require('./reset.less')

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true // false显示登录界面 true显示内页
    }
  }
  render() {
    let display = this.state.isLogin ? <MarkDownPreview /> : <Login changeLoginState={this.loginStateChange.bind(this)}/>
    return(
      <div style={{width: '100%',height: '100%'}}>
        {display}
      </div>
    )
  }
  loginStateChange(state) {
    this.setState({
      isLogin: state
    })
  }
}
