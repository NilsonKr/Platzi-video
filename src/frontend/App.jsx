import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import MediaPlayer from './pages/MediaPlayer';

const App = () => (
	<BrowserRouter>
		<Layout>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/login' component={LogIn} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/video/:id' component={MediaPlayer} />
				<Route component={NotFound} />
			</Switch>
		</Layout>
	</BrowserRouter>
);

export default App;
