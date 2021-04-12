import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';

import '@styles/styles.scss';

ReactDOM.render(
	<Provider>
		<App />
	</Provider>,
	document.querySelector('#app')
);
