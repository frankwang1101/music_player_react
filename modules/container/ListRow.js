import React from 'react'
import fetch from 'fetch-jsonp'
import {connect,Provider} from 'react-redux'
import {CONFIG} from'./Config'
import {fetchSong,toggleFavorite,addToNowList} from '../actions/Action'
import {formatText,isContain} from '../util/utils'

class Cell extends React.Component{
	constructor(...args){
		super(args);
		this.addToList = this.addToList.bind(this)
	}
	addToList(){
		this.props.addToNowList({song_id:this.props.song_id,title:this.props.title})
	}
	render(){ 
		const {id,play,title,author,target,album_title,like,heartStyle} = this.props
		return (<li key={id} onDoubleClick={play}>{target}<i className={"iconfont "+heartStyle} onClick={like}></i><i onClick={this.addToList}  className="iconfont icon-plus"/><div className="music-div">{title}</div><div className="music-div">{author}</div><div className="music-div"></div>{album_title}</li>)
	}
}

function first(state,o){
	let id = o.song_id,
		title = formatText(o.title),
		author = formatText(o.author),
		album_title = formatText(o.album_title);
		let target = '';
		if(state.panelReducer.info && state.panelReducer.info.id === id){
			target = (<i style={{'float':'left'}}>-> </i>)
		}
	let heartStyle = isContain(state.reducer.favs,id)?'icon-heart1':'icon-heart';
	return{
		id,title,author,target,album_title,heartStyle
	}
}
function second(dispatch,b){
	return{
		play : () => dispatch(fetchSong(b)),
		like : () => dispatch(toggleFavorite(b)),
		addToNowList : (obj) => dispatch(addToNowList(obj))
	}
}



export default connect(first,second)(Cell);