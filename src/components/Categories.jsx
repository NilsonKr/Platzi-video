import React from 'react';
import '@styles/components/Categories.scss';

const Categories = ({children, title}) => {
	return (
		<div className='catgories'>
			<h3 className='categories__title'>{title}</h3>
			{children}
		</div>
	);
};

export default Categories;
