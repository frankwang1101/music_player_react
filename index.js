import React from 'react'
import {Provider,connect} from 'react-redux'
import { render } from 'react-dom'
import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import * as reducers from './modules/reducer/reducers'
import Routes from './modules/router/route'

const store = createStore(combineReducers(reducers),applyMiddleware(thunk));
render(<Provider store = {store}><Routes /></Provider>, document.getElementById('app'))
