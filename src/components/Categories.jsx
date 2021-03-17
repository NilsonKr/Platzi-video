import React from 'react';
import '@styles/components/Categories.scss';

const Categories = ({children}) => {
	return (
		<div className='catgories'>
			<h3 className='categories__title'>Mi lista</h3>
			{children}
		</div>
	);
};

export default Categories;
