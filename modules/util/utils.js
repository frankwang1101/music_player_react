export function renderLyric(str){
	let arr = str.split('\n')
	let res_arr = [];
	if(str && str.length > 0){
		arr.forEach((v,i) => {
			
			let exec = /^\[(\d{2}):(\d{2})\.(\d{2})\](.*)$/.exec(v)
			if(exec && exec.length > 1){
			let time = parseInt(exec[1] || 0)*60+parseInt(exec[2] || 0)
			let text = RegExp.$4
			res_arr.push([time,text])}
		})
	}
	return res_arr
}

export function isContain(arr,key){
	let flag = false;
	if(arr && arr.length > 0){
		for(let i=0;i<arr.length;i++){
			if(arr[i].song_id === key){
				flag = !flag;
				break;
			}
		}
	}
	return flag;
}

export function formatText(t){
	if(typeof t !== 'string'){
		return t
	}
	return t.replace(/<[^>]+>/g,'');
}

export function formatDuration(t){
	if(t){
		let m = 0;
		let h = 0;
		let s = 0;
		m = parseInt(t / 60);
		if(m > 60){
			h = parseInt(m%60);
		}
		t = t % 60;
		h = h>0?(h>9?h:('0'+h))+':':''
		m = m>0?(m>9?m:('0'+m))+':':'00:'
		return h+m+(t>9?t:('0'+t));
	}else{
		if(t === 0){
			return '00:00'
		}
		return '';
	}
}

export function getLocalStorage(key){
	let list = localStorage.getItem('React_'+key);
	if(list != null){
		return JSON.parse(list);
	}else{
		return [];
	}
}

export function setLocalStorage(key,arr){
	localStorage.setItem('React_'+key,JSON.stringify(arr));
}
