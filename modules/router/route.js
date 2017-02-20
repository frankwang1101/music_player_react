import React from 'react'
import {Router,Route,browserHistory,hashHistory,IndexRoute} from 'react-router'
import App from '../App'
import Favorite from '../container/Favorite'

let MusicList = (location,cb) => {
	require.ensure([],(require) => {
		cb(null,require('../container/MusicList').default);
	},'musicList');
};

let QueryList = (location,cb) => {
	require.ensure([],require => {
		cb(null,require('../container/QueryList').default);
	},'QueryList');
};

let Lyrics = (location,cb) => {
	require.ensure([],require => {
		cb(null,require('../container/Lyrics').default);
	},'Lyrics');
};

const routes = (
	<Route path='/' component={App}>
		<IndexRoute component={Favorite}/>
		<Route path='/channel/:id' getComponent={MusicList}/>
		<Route path='/query/:keyword' getComponent={QueryList}/>
		<Route path='/lyrics' getComponent={Lyrics}/>
	</Route>
)

export default class Routes extends React.Component{
	render(){
		return (<Router history={hashHistory} routes={routes}></Router>)
	}
};