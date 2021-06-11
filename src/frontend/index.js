import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer';

import App from './App';

import './styles/styles.scss';

const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(reducer, preloadedState, applyMiddleware(reduxThunk));

//Delete public state
delete window.__PRELOADED_STATE__;

ReactDOM.hydrate(
	<Provider store={store}>
		<App isLogged={preloadedState.user.id} />
	</Provider>,
	document.querySelector('#app')
);
