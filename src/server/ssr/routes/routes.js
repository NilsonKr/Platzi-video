import Home from '../../../frontend/pages/Home';
import LogIn from '../../../frontend/pages/LogIn';
import Register from '../../../frontend/pages/Register';
import NotFound from '../../../frontend/pages/NotFound';
import MediaPlayer from '../../../frontend/pages/MediaPlayer';

const routes = isLogged => {
	return [
		{
			exact: true,
			path: '/',
			component: isLogged ? Home : LogIn,
		},
		{
			exact: true,
			path: '/login',
			component: LogIn,
		},
		{
			exact: true,
			path: '/register',
			component: Register,
		},
		{
			exact: true,
			path: '/video/:id',
			component: isLogged ? MediaPlayer : LogIn,
		},
		{
			name: 'NotFound',
			component: NotFound,
		},
	];
};

export default routes;
