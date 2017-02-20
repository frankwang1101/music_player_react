import {renderLyric,getLocalStorage,setLocalStorage} from '../util/utils'

const initHistoryList = getLocalStorage('History');
const initFavoriteList = getLocalStorage('favorites');
const initState = {
	favs:initFavoriteList,
	list:[],
	curIndex : 0,
	playHistory:initHistoryList,
	nowList:[],
};
const panelState = {
	showState:'list',
	info:{
		play:false,
		isFetch:false,
		id:-1,
		volume:1
	}
}
const lyricsState = {
	lyric_info:{}
}
const queryState = {
	queryList:[]
}

export const queryReducer = (state = queryState,action) => {
	switch (action.type) {
	    case 'QUERYING':
	    case 'QUERYFAIL':
	        return Object.assign({}, state, { queryFetching: action.queryFetching, querySuccess: action.querySuccess, keyword: action.keyword })
	    case 'QUERYSUCCESS':
	        return Object.assign({}, state, { queryFetching: false, querySuccess: true, keyword: action.keyword, queryList: action.list })
	    default:
	        return state;
	}

}
export const panelReducer = (state = panelState, action) => {
	switch (action.type) {
	    case 'PLAY':
	        return Object.assign({}, state, { nowPlay: action.id, info: action.info })
	    case 'PLAYSTATE':
	        let k1 = Object.assign({}, state);
	        k1.info.play = action.playFlag;
	        return k1;
	    case 'TIMEUPDATE':
	        //在这发现了要新建state的原因，旧的state无法发布到mapStateToProp,不过底下这个什么情况？
	        let k = Object.assign({}, state);
	        k.info.currTime = action.time;
	        return k;
	    case 'CHANGEPROGRESS':
	        let k3 = Object.assign({}, state);
	        k3.info.currTime = action.currTime;
	        return k3;
	    case 'CHANGEVOLUME':
	        let k2 = Object.assign({}, state);
	        k2.info.volume = action.volume;
	        return k2;
	    case 'CHANGESHOWSTATE':
	        return Object.assign({}, state, { showState: action.showState });
	    case 'FETCHINGSONG':
	        state.info.isFetch = action.isFetch;
	        state.info.id = action.id;
	        return state;
	    default:
	        return state;

	}

}

export const lyricsReducer = (state = lyricsState,action) => {
	switch (action.type) {
	    case 'FETCHLYRICFAIL':
	    case 'FETCHINGLYRIC':
	        console.log(action.type);
	        let lyricState = Object.assign({}, state);
	        lyricState.lyric_info = Object.assign({}, lyricState.lyric_info, { "isFetch": action.isFetch, "success": action.isSuccess, "song_id": action.id });
	        return lyricState;
	    case 'FETCHLYRICSUCCESS':
	        let lyricSuccess = Object.assign({}, state);
	        lyricSuccess.lyric_info = Object.assign({}, lyricSuccess.lyric_info, { "isFetch": action.isFetch, "success": action.isSuccess, "song_id": action.id, arr: action.arr, title: action.title });
	        return lyricSuccess;
	    default:
	        return state;
	}
}

export const reducer = (state = initState, action) => {
 	switch (action.type) {
 	    case 'RECEIVE':
 	        return Object.assign({}, state, { list: action.arr })
 	   
 	    case 'PUSHLISTTOHISTORY':
 	        let l_str = state.nowList.map(v => v.song_id).toString();
 	        let temp_List = state.nowList;
 	        for (let k in action.arr) {
 	            if (l_str.lastIndexOf(action.arr[k].id) === -1) {
 	                temp_List.push(action.arr[k]);
 	            }
 	        }
 	        return Object.assign({}, state, { nowList: temp_List });
 	    case 'PUSHTOBOTHLIST':
 	        let tempNowList = state.nowList;
 	        let tempHis = state.playHistory;
 	        let flag = true;
 	        let hflag = true;
 	        for (let k in tempNowList) {
 	            if (tempNowList[k].song_id === action.id) {
 	                flag = false;
 	            }
 	        }
 	        if (tempHis.length > 50) {
 	            tempHis.pop();
 	        }
 	        for (let k in tempHis) {
 	            if (tempHis[k].song_id === action.id) {
 	                hflag = false;
 	            }
 	        }
 	        if (flag) {
 	            tempNowList.push({ 'title': action.title, song_id: action.id })
 	        }
 	        if (hflag) {
 	            tempHis.push({ 'title': action.title, song_id: action.id })
 	            localStorage.setItem('React_History', JSON.stringify(tempHis))
 	        }
 	        return Object.assign({}, state, { nowList: tempNowList, playHistory: tempHis });

 	    case 'CONFIRMINDEX':
 	        let pflag = 0;
 	        for (let n in state.nowList) {
 	            if (state.nowList[n].song_id === action.song_id) {
 	                pflag = n;
 	            }
 	        }
 	        return Object.assign({}, state, { 'curIndex': pflag });
 	    case 'UPDATEFAVORITELIST':
 	        let favs = JSON.parse(localStorage.getItem('React_' + action.key));
 	        return Object.assign({}, state, { favs: favs });
 	    case 'UPDATEHISTORYLIST':
 	        let hists = JSON.parse(localStorage.getItem('React_' + action.key));
 	        return Object.assign({}, state, { playHistory: hists || [] });

 	    default:
 	        return state
 	}

}