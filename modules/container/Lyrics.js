import React from 'react'
import {connect} from 'react-redux'
import * as Action from '../actions/Action'
import {bindActionCreators} from 'redux'

function ArrToList(props){
	let {arr,pos} = props
	// let arr = [[1,'a'],[2,'b']]
	if(arr && arr.length > 0){
	let k = arr.map((item,idx) => {
		// item[1] = item[1].length == 0 ? ' ':item[1]
		if(item[1].length == 0){
			return null;
		}
		console.log('enter pos ...'+props.pos);
		return <li className={(item[0]==pos[1])?'target-lyric':''} key={item[0] + 'asd'+idx}>{item[1]}</li>
	})
	
	return (<ul style={{'top':props.lyricTop}}>{k}</ul>);
}else{return (<span></span>)}
	
}

class Lyric extends React.Component{
	
	constructor(...args){
		super(args)
	}

	componentDidMount(){
		this.props.actions.fetchSongLyric(this.props.song_id)
	}

	componentWillUpdate(next){
		if(( !this.props.isFetch && !this.props.success)   || (this.props.song_id !== next.song_id)){
			this.props.actions.fetchSongLyric(next.song_id)
		}
	}

	render(){
		let {arr,title,pic_b,album_title,author,lyricTop,pos} = this.props
		return (
			<div className="lyric-wrap">
				<div className="music-area">
					<div className="album-area">
						<img src={pic_b} />
					</div>
					<div className="music-info">
						<div className="music-title">{title}</div>
						<div className="music-author">{author}</div>
						<div className="music-album">{album_title}</div>
					</div>
				</div>
				<div className="lyric-area">
					<div className="lyric">
						<ArrToList arr={arr} lyricTop={lyricTop} pos={pos} />
					</div>
				</div>
			</div>
			);
	}
}

function mapStateToProps(state,ownProps){
	let {info} = state.panelReducer;
	let {lyric_info} = state.lyricsReducer;
	let {pic_b,lyric,title,album_title,author,id,currTime} = info;
	let {isFetch,success,arr} = lyric_info
	let pos = [];
	if(!isFetch && success && arr.length > 0){
		let timeline = [];
		for(let k in arr){
			if(arr[k][1].length && arr[k][1].length > 0){
				timeline.push(arr[k]);
			}
		}
		pos = findIndex(currTime,timeline)
	}
	let lyricTop = 'inherit';
	if(pos.length > 0 && pos[1] != -1){
		// console.log(pos);
		lyricTop = `${-(pos[0]) * 25  + 60}px`
	}
	return {
		pic_b,title,album_title,author,lyric,song_id:id,arr,lyricTop,pos,success,isFetch
	}
}

function findIndex(time,line){
	let start = 0 ;
	let end = line.length - 1;
	let res = -1;
	while(start < end){
		if(line[start][0] > time){
			res =  start > 0 ? (Math.abs(line[start][0] -time) - Math.abs(line[start - 1][0] - time) ? start-1:start) : 0;
			break;
		}
		if(line[end][0] < time){
			res = end < line.length ? (Math.abs(line[end][0] -time) - Math.abs(line[end + 1][0] - time) ? end+1:end) : end;
			break;
		}
		start++;
		end--;
	}
	return [res,res==-1?res:line[res][0]];
}

function mapDispatchToProps(dispatch,ownProps){
	return {
		actions : bindActionCreators(Action,dispatch)
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Lyric);