import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer';

import App from './App';

import './styles/styles.scss';

const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(reducer, preloadedState);

//Delete public state
delete window.__PRELOADED_STATE__;

ReactDOM.hydrate(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#app')
);
