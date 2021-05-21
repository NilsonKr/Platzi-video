import Home from '../../frontend/pages/Home';
import LogIn from '../../frontend/pages/LogIn';
import Register from '../../frontend/pages/Register';
import NotFound from '../../frontend/pages/NotFound';
import MediaPlayer from '../../frontend/pages/MediaPlayer';

const routes = [
	{
		exact: true,
		path: '/',
		component: Home,
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
		component: MediaPlayer,
	},
	{
		name: 'NotFound',
		component: NotFound,
	},
];

export default routes;
