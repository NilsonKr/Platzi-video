import React from 'react';

import Footer from './Footer';

const Layout = props => (
	<>
		{props.children}
		<Footer />
	</>
);

export default Layout;
