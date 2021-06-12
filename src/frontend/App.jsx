import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import LoginSocialMedia from './pages/LoginSocialMedia';
import MediaPlayer from './pages/MediaPlayer';

const App = ({ isLogged }) => (
	<Layout>
		<Switch>
			<Route exact path='/' component={isLogged ? Home : LogIn} />
			<Route exact path='/login' component={LogIn} />
			<Route exact path='/register' component={Register} />
			<Route exact path='/video/:id' component={isLogged ? MediaPlayer : LogIn} />
			<Route path='/social/sign-in/succesful' component={LoginSocialMedia} />
			<Route component={NotFound} />
		</Switch>
	</Layout>
);

export default App;
