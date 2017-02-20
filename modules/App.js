import React from 'react'
import {Link} from 'react-router'
import SideBar from './container/SideBar'
import Panel from './container/Panel'
import {hashHistory,withRouter} from 'react-router'
require('../styles/music.less');
require('../styles/font/iconfont.css')



class App extends React.Component{

  constructor(...args){
    super(args);
    this.keyPress = this.keyPress.bind(this)
  }

  keyPress(e){
    if(e.charCode === 13){
        let v = e.currentTarget.value
        this.props.router.push(`/query/${v}`)
    }
  }

  render() {
    return (
    <div className="wrap">
        <header>
            <div className="logo fll">百度音乐API</div>
            <div className="search-area fll">
                <input type="text" className="search" onKeyPress={this.keyPress}/>
            </div>
        </header>
        <div className="center">
            <SideBar/>
            <div className="list-area">
                {this.props.children}
            </div>
        </div>
        <Panel />
    </div>
    )
  }
}
export default withRouter(App);

