import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import initialState from '../initialState';
import reducer from '../reducers/reducer';

const store = createStore(reducer, initialState, applyMiddleware(ReduxThunk));

const ProviderMock = props => (
	<Provider store={store}>
		<MemoryRouter>{props.children}</MemoryRouter>
	</Provider>
);

module.exports = ProviderMock;
