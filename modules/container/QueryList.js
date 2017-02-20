import React from 'react'
import {connect} from 'react-redux'
import * as Actions from '../actions/Action'
import { bindActionCreators } from 'redux';
import ListRow from './ListRow';


function List(props){
	return (<ul>
		<li className="top-li"><div className="music-div">歌名</div><div className='music-div'>歌手</div><div className='music-div'>专辑</div></li>
		{props.list.map((obj,idx) => {
					return (<ListRow key={idx} list_index={idx} {...obj}/>)
				})}</ul>)
}

class QueryList extends React.Component{

	constructor(...args){
		super(args);
	}

	componentDidMount(){
		this.props.actions.querySpecialList(this.props.params.keyword);
	}

	componentWillReceiveProps(next){
		if(next.params.keyword != this.props.params.keyword){
			this.props.actions.querySpecialList(next.params.keyword);			
		}
	}

	render(){
		const {list} = this.props
		return (<List list={list} play={this.props.play} />)
	}
}

function mapPropsToState(state,ownProps){
	let list = state.queryReducer.queryList
	return {
		list
	}
}

function mapDispatchToState(dispatch,ownProps){
	return {
		actions : bindActionCreators(Actions,dispatch)
	}
}

export default connect(mapPropsToState,mapDispatchToState)(QueryList);