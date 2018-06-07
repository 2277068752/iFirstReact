import React, { Component } from 'react'
import ReactDom from 'react-dom'
import './index.less'

class App extends Component {
  render () {
    return (
      <div className="wrapper">hello world,我的第一个React项目</div>
    )
  }
}

ReactDom.render(<App/>, document.getElementById('root'))