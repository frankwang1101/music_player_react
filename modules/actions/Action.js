import {CONFIG} from '../container/Config'
import fetch from 'fetch-jsonp'
import {renderLyric,getLocalStorage,setLocalStorage,isContain} from '../util/utils'


export function fetchChannelList(id){
	return (dispatch) => {
		let url = `${CONFIG.url}?method=${CONFIG.list}&type=${id}&size=50&offset=0`;
		return fetch(url,{
				method:'post',
				jsonpCallback: "callback"
				}
			).then(res => res.json()).then(json => {
				console.log(json);
				dispatch({type:'RECEIVE',arr:json.song_list})
			}).catch(e => console.log(e))
	}

}

export function toggleFavorite(ownProp){
	return dispatch => {
		let obj = {};
		obj.song_id = ownProp.song_id;
		obj.title = ownProp.title;
		obj.author = ownProp.author;
		obj.album_title = ownProp.album_title;
		let key = 'favorites';
		setLocalStorage(key,toggleContain(getLocalStorage(key),obj));
		dispatch({type:'UPDATEFAVORITELIST',key:key})
	}
}

export function fetchFavoriteList(){
	return dispatch => {
		dispatch({type:'UPDATEFAVORITELIST',key:'favorites'});
	}
}

function toggleContain(arr,obj){
	let flag = true;
	for(let i=0;i<arr.length;i++){
		if(arr[i].song_id === obj.song_id ){
			arr.splice(i,1)
			flag = false;
			break;
		}
	}
	if(flag){
		arr.push(obj)
	}
	return arr;
}



function fetchTheSong(id,idx,isHistory=false){
	return dispatch => {
		if(id === -1){
			return null;
		}
		let url = `${CONFIG.url}?method=${CONFIG.song}&songid=${id}`
		dispatch(fetchingSong(id));
		fetch(url).then(res => res.json()).then(res => {
			let info = {
				link:res.bitrate.file_link,
				lyric:res.songinfo.lrclink,
				title:res.songinfo.title,
				author:res.songinfo.author,
				id:res.songinfo.song_id,
				pic_s:res.songinfo.pic_small,
				pic_b:res.songinfo.pic_big,
				size:res.bitrate.file_size,
				duration:res.bitrate.file_duration,
				album_title:res.songinfo.album_title,
				play:false,
				currTime:''
			}
			window.document.body.style.background = `url(${info.pic_s}) no-repeat`;
			window.document.body.style.backgroundSize = 'cover'
			dispatch(pushSongToPlayList(info.id,info.title));
			dispatch({type:'PLAY',id:id,info:info,success:true,isFetch:false,isHistory:isHistory})
			dispatch({type:'CONFIRMINDEX',song_id:info.id});
		}).catch(e => {
			dispatch(fetchSongFail(id))
		})
	}
}

export function pushSongToPlayList(id,title){
	return {
		type:'PUSHTOBOTHLIST',
		title:title,
		id:id
	}
}

export function fetchSong(o){
	return dispatch => {
		return dispatch(fetchTheSong(o.song_id,o.list_index,o.isHistory));
	}
}

export function changeMode(){
	return (dispatch,getState) => {
		let state = getState();
		let mode_arr = ['order','cycle','single-cycle','random']
		let {mode_index,mode} = state.panelReducer.info;
		mode_index = (mode_index+1)%mode_arr.length;
		mode = mode_arr[mode_index];
		dispatch({type:'CHANGEMODE',mode:mode,index:mode_index});
	}
}

export function prev(){
	return (dispatch,getState) => {
		let {curIndex,nowList} = getState().reducer;
		if(curIndex != 0){
			curIndex--;
		}else{
			curIndex = nowList.length - 1;
		}
		let song = nowList[curIndex]
		dispatch(fetchTheSong(song.song_id,curIndex))
	}
}

export function next(flag){
	return (dispatch,getState) => {
		let {curIndex,nowList} = getState().reducer;
		let {mode_index} = getState().panelReducer;
		if(flag == true){
			switch(mode_index){
				case '0':
					if(curIndex < nowList.length -1 ){curIndex++;}
					break;
				case '1':
					curIndex = (curIndex + 1) % nowList.length;
					break;
				case '3':
					curIndex = parseInt(Math.random()*nowList.length);
					break;
				default:
					break;

			}
		}else{
			curIndex = (curIndex + 1) % nowList.length;
		}
		let song = nowList[curIndex]
		dispatch(fetchTheSong(song.song_id,curIndex))
	}
}

export function toggle(e){
	return (dispatch,getState) => {
		let info = getState().panelReducer.info
		if(info != undefined && info.id != undefined){
			!info.play?e.play():e.pause();
			dispatch({type:"PLAYSTATE",playFlag:!info.play});
		}else{
			dispatch({type:"PLAYSTATE",playFlag:false})
		}
	}
}

export function changeShowState(flag){
	return dispatch => {
		dispatch({type:'CHANGESHOWSTATE',showState:flag?'list':'history'})
	}
}

export function updateTime(audio){
	return {
		type : 'TIMEUPDATE',
		time : parseInt(audio.currentTime || 0)
	}
}

function fetchingSong(id){
	return {
		type : 'FETCHINGSONG',
		isFetch : true,
		id:id
	}
}
function fetchSongFail(id){
	return {
		type : 'FETCHINGSONG',
		isFetch : false,
		success:false,
		id:id
	}
}

export function addToNowList(obj){
	return (dispatch,getState) => {
		let {nowList} = getState().reducer;
		if(!isContain(nowList,obj.song_id)){
			dispatch({type:'UPDATENOWLIST',item:obj});
		}
	}
}

export function changeVolume(e,audio){
	let volume = (e.clientX-(e.currentTarget.offsetLeft+e.currentTarget.offsetParent.offsetLeft))/e.currentTarget.clientWidth
	audio.volume = volume;
	return {
		type : 'CHANGEVOLUME',
		volume : volume
	}
}

export function changeProgress(e,audio){
	let p = (e.clientX-(e.currentTarget.offsetLeft+e.currentTarget.offsetParent.offsetLeft))/e.currentTarget.clientWidth;
	audio.currentTime = audio.duration * p
	return {
		type : 'CHANGEPROGRESS',
		currTime : parseInt(p * audio.duration)

	}
}

export function querySpecialList(keyword){
	return (dispatch,getState) => {
		let state = getState().queryReducer
		if(keyword === state.keyword && (state.queryFetching || state.querySuccess)){
			return null;
		}
		let url = `${CONFIG.url}?method=${CONFIG.query}&query=${keyword}&page_no=&page_size=50`;
		dispatch({type:'QUERYING',keyword:keyword,queryFetching:true,querySuccess:false})
		fetch(url).then(res => res.json()).then(res => {
			console.log(res.song_list);
			dispatch({type:'QUERYSUCCESS',list:res.song_list})
		}).catch(e => {
			dispatch({type:'QUERYFAIL',keyword:keyword,queryFetching:false,querySuccess:false})
		})
	}
}

export function fetchSongLyric(songid){
	return (dispatch,getState) => {
		// console.log('enter...');
		if(songid === -1){
			return null;
		}
		let url = `${CONFIG.url}?method=${CONFIG.lyric}&songid=${songid}`;
		dispatch(fetchingLyric(songid));
		fetch(url,{
			timeout:30000
		}).then(res => res.json()).then(obj => {
			let {lrcContent,title} = obj;
			if(lrcContent && title){
				dispatch(fetchLyricSuccess(songid,renderLyric(lrcContent),title))
			}else{
				throw "nothing";
			}
		}).catch(e => {
			console.log(e);
			dispatch(fetchLyricFail(songid))
		})
	}
}


function fetchingLyric(id){
	return {
		type : 'FETCHINGLYRIC',
		isFetch : true,
		isSuccess : false,
		id:id
	}
}

function fetchLyricSuccess(id,arr,title){
	return {
		type : 'FETCHLYRICSUCCESS',
		isFetch : false,
		isSuccess : true,
		id:id,
		arr:arr,
		title:title
	}
}

function fetchLyricFail(id){
	return {
		type : 'FETCHLYRICFAIL',
		isFetch : false,
		isSuccess : false,
		id:id
	}
}