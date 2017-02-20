import React from 'react'
import {connect} from 'react-redux'
import * as Actions from '../actions/Action'
import { bindActionCreators } from 'redux';
import ListRow from './ListRow';
import {CONFIG} from './Config'

function List(props){
	let id = props.id;
	return (<ul><li className="top-li"><div className="music-div">歌名</div><div className='music-div'>歌手</div><div className='music-div'>专辑</div></li>
		{props.list.map((obj,idx) => {
					return (<ListRow key={idx} list_index={idx} {...obj}/>)
				})}</ul>)
}

class Favorite extends React.Component{

	constructor(...args){
		super(args);
		
	}
	componentWillMount(){
	}
	componentDidMount(){
		this.props.action.fetchFavoriteList()
	}
	//这里的next是下一个状态的意思，所以要获取列表要从下一个状态里取值判断
	componentWillReceiveProps(next){
		if(next.list.length != this.props.list.length){
			this.props.action.fetchFavoriteList()
		}
	}
	render(){
		const {list} = this.props
		return (<List id={this.props.params.id} list={list} />)
	}
}
function map1(state){
	let favoriteList = state.reducer.favs || []
	
	return {
		list : favoriteList
	}
}
const map2 = (dispatch,ownProps) => {
	return {
		action : bindActionCreators(Actions,dispatch),

	}
}

export default connect(map1,map2)(Favorite);
