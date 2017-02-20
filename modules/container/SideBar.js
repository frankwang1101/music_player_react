import React from 'react'
import {Link} from 'react-router'

function List(){
	const list = ['新歌榜','热歌榜','摇滚榜','爵士','流行','欧美金曲榜','经典老歌榜','情歌对唱榜','影视金曲榜','网络歌曲榜'];
	const channel = [1,2,11,12,16,21,22,23,24,25];
	const a =  list.map((item,idx) => {
		idx = channel[idx % channel.length]
		return (<li key={idx} data-id={idx}><Link to={'/channel/'+idx}  activeStyle={{textDecoration:'none'}}  activeClassName="active">{item}</Link></li>)
	})
	if(a.length > 0){
		a.push(<li key={a.length} data-id={a.length}><Link to={'/'}  activeStyle={{textDecoration:'none'}} onlyActiveOnIndex={true} activeClassName="active">我喜爱的</Link></li>)
	}
	return (<ul>{a}</ul>)
}

export default class extends React.Component{
	render(){
		return (
			<div className="sidebar">
				<List/>
			</div>
		)
	}
}

