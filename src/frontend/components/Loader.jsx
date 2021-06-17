import React from 'react';

import '../styles/components/Loader.scss';

const Loader = () => {
	return (
		<div class='loading'>
			<div class='dot'></div>
			<div class='dot'></div>
			<div class='dot'></div>
			<div class='dot'></div>
			<div class='dot'></div>
		</div>
	);
};

export default Loader;
