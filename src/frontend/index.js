import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import INITIAL_STATE from './initialState';
import App from './App';

import '@styles/styles.scss';

const store = createStore(reducer, INITIAL_STATE);
const history = createBrowserHistory();

ReactDOM.hydrate(
	<Provider store={store}>
		<Router history={history}>
			<App />
		</Router>
	</Provider>,
	document.querySelector('#app')
);
