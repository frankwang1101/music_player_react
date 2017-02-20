import React from 'react'
import fetch from 'fetch-jsonp'
import {Provider,connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import ListRow from './ListRow';
import {CONFIG} from './Config'
import * as Actions from '../actions/Action'

function List(props){
	let id = props.id;
	return (<ul><li className="top-li"><div className="music-div">歌名</div><div className='music-div'>歌手</div><div className='music-div'>专辑</div></li>
		{props.list.map((obj,idx) => {
					return (<ListRow key={idx} list_index={idx} {...obj}/>)
				})}</ul>)
}

class MusicList extends React.Component{
	constructor(...args){
		super(args);
		
	}
	componentWillMount(){
	}
	componentDidMount(){
		let id = this.props.params.id
		this.props.action.fetchChannelList(id)
	}
	//这里的next是下一个状态的意思，所以要获取列表要从下一个状态里取值判断
	componentWillReceiveProps(next){
		let id = this.props.params.id
		if(next.params.id != id){
			this.props.action.fetchChannelList(next.params.id)
		}
	}
	render(){
		console.log('...');
		const {list} = this.props
		return (<List id={this.props.params.id} list={list} />)
	}
}
function map1(state){
	let list = state.reducer.list || []
	
	return {
		list : list
	}
}
const map2 = (dispatch,ownProps) => {
	return {
		action : bindActionCreators(Actions,dispatch),

	}
}

export default connect(map1,map2)(MusicList);
