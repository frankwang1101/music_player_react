import React from 'react'
import {connect} from 'react-redux'
import {prev,next,toggle,updateTime,changeProgress,changeVolume,fetchSong,changeShowState,changeMode} from '../actions/Action'
import {Link} from 'react-router'
import {formatDuration} from '../util/utils'

class Panel extends React.Component{

	constructor(...args){
		super(...args);
		this.play = this.play.bind(this)
		this.updateTime = this.updateTime.bind(this)
		this.changeVol = this.changeVol.bind(this)
		this.changePro = this.changePro.bind(this)
		this.toggleUl = this.toggleUl.bind(this)
		this.playThis = this.playThis.bind(this)
		this.showHistory = this.showHistory.bind(this)
		this.showPlayList = this.showPlayList.bind(this)
		this.changeMode = this.changeMode.bind(this)
		this.endNext = this.endNext.bind(this)
	}
	changePro(e){
		if(!this.props.isFetch && this.props.id != -1)
		this.props.changeProgress(e,this.refs.audio)
	}
	changeVol(e){
		this.props.changeVolume(e,this.refs.audio)
	}
	updateTime(){
		this.props.updateTime(this.refs.audio)
	}
	play(e){
		this.props.toggle(this.refs.audio)
	}
	toggleUl(e){
		this.refs.ul.classList.toggle('active')
	}
	changeMode(e){
		this.props.changeMode()
	}
	endNext(){
		this.props.next(true);
	}
	showHistory(e){
		if(this.props.showState === 'list'){
			this.props.changeShowState(false)
		}
	}
	showPlayList(e){
		if(this.props.showState !== 'list'){
			this.props.changeShowState(true)
		}
	}
	componentDidMount(){
		this.refs.audio.volume = this.props.volume
	}
	componentDidUpdate(pre){
		if(this.props.link != '' && pre.link != this.props.link){
			this.props.toggle(this.refs.audio)
		}
	}
	playThis(e){
		let o = e.currentTarget.dataset;
		this.props.fetchSong({song_id:o.id,list_index:o.index,isHistory:true});
	}

	render(){
		const {link,title,author,duration,prev,next,currTime,timeWidth,isFetch,id,play_icon,volumeWidth,pic,nowList,showState,mode} = this.props
		return (
		<div className="music-panel">
			<audio src={link} ref="audio" onEnded={this.endNext} onTimeUpdate={this.updateTime}/>
            <div className="center-panel">
                <div className="title">{title}  {author}</div>
                <div className="process" onClick={this.changePro}>
                	<span className="bg-process" style={{width:timeWidth}}></span><span className="time-area">{formatDuration(currTime)}{(isFetch != true && id!=-1) ?'/':''}{formatDuration(duration)}</span>
               	</div>
            </div>
            <div className="left-panel">
				<Link  to={'/lyrics/'}  activeStyle={{textDecoration:'underline'}}><img src={pic} className="album-pic"/></Link>
                <a className="iconfont icon-prev" onClick={prev}></a>
                <a className={`iconfont ${play_icon}`} style={{fontSize:'35px!important'}} onClick={this.play}></a>
                <a className="iconfont icon-next" onClick={next}></a>
            </div>
            <div className="right-panel">
                <div className="mode-change" onClick={this.changeMode}><a className={"iconfont icon-"+mode}></a></div>
                <div className="mode" onClick={this.toggleUl}><a className="iconfont icon-list"></a></div>
                <div className="volume-btn">
                	<a className="iconfont icon-volume"></a>
                </div>	
                <div className="volume" onClick={this.changeVol} >
                    <div className="volume-bar" style={{width:volumeWidth}}></div>
                </div>
            </div>
            <div className="history-area" ref="ul">
            	<div className="head">
            		<div className={showState === 'list' ? 'active head-block' :'head-block'} onClick={this.showPlayList}>播放列表</div>
            		<div className={showState === 'history' ? 'active head-block' :'head-block'} onClick={this.showHistory}>播放历史</div>
            	</div>
            	<div className="body">
            		<HistoryList list={nowList} play={this.playThis} nowid={id}/>
            	</div>
            </div>
        </div>)
	}

}


function HistoryList(props){
	let list = props.list
	let k = list.map((v,idx) => {
		return (<li key={idx+'HISTORY01010'} data-id={v.song_id} data-index={idx} onDoubleClick={props.play}>{props.nowid==v.song_id?'->':''}{v.title}</li>);
	})
	return (<ul>{k}</ul>);
}

function a(state,prop){
	let {link,title,author,duration,currTime,isFetch,id,play,volume,pic_s,mode} = state.panelReducer.info || ""
	let {nowList,playHistory} = state.reducer;
	let {showState} = state.panelReducer;
	let timeWidth = `${((currTime || 0)/duration)*100}%`
	let volumeWidth = `${volume*100}%`
	if(!isFetch && id!=-1){
		currTime = currTime || 0
		window.document.head.querySelector('title').innerHTML = `${title}  ${author}`
	}
	let plist = showState === 'list' ? nowList : playHistory
	return {
		link,title,author,duration,currTime,timeWidth,isFetch,id,play_icon:!play?'icon-play':'icon-stop',volume,volumeWidth,pic:pic_s,nowList:plist,showState,mode
	}
}

function b(d,prop){
	return {
		prev : () => d(prev(prop)),
		next : (flag) => d(next(prop)),
		toggle : (a) => d(toggle(a)),
		updateTime : (a) => d(updateTime(a)),
		changeVolume : (a,b) => d(changeVolume(a,b)),
		changeProgress : (a,b) => d(changeProgress(a,b)),
		fetchSong : (o) => d(fetchSong(o)),
		changeShowState : (flag) => d(changeShowState(flag)),
		changeMode : () => d(changeMode())
	}
}




export default connect(a,b)(Panel);
