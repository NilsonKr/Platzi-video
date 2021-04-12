import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Register from './pages/Register';

const App = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Home} />
			<Route exact path='/login' component={LogIn} />
			<Route exact path='/register' component={Register} />
		</Switch>
	</BrowserRouter>
);

export default App;
