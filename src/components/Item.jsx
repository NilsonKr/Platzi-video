import React from 'react';
import PropTypes from 'prop-types';

import '../styles/components/Item.scss';
import playIcon from '@assets/play-icon.png';
import plusIcon from '@assets/plus-icon.png';

const Item = ({title, cover, year, contentRating, duration}) => {
	return (
		<div className='carousel-item'>
			<img className='carousel-item__img' src={cover} alt='' />
			<div className='carousel-item__details'>
				<div>
					<img className='carousel-item__details--img' src={playIcon} alt='Play Icon' />
					<img className='carousel-item__details--img' src={plusIcon} alt='Plus Icon' />
				</div>
				<p className='carousel-item__details--title'>{title}</p>
				<p className='carousel-item__details--subtitle'>{`${year} ${contentRating} ${duration} minutes`}</p>
			</div>
		</div>
	);
};

Item.propTypes = {
	cover: PropTypes.string,
	title: PropTypes.string,
	year: PropTypes.number,
	contentRating: PropTypes.string,
	duration: PropTypes.number,
};

export default Item;
