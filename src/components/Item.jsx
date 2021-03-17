import React from 'react';
import '../styles/components/Item.scss';
import playIcon from '@assets/play-icon.png';
import plusIcon from '@assets/plus-icon.png';

const Item = () => {
	return (
		<div className='carousel-item'>
			<img
				className='carousel-item__img'
				src='https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=2&h=750&w=1260'
				alt=''
			/>
			<div className='carousel-item__details'>
				<div>
					<img className='carousel-item__details--img' src={playIcon} alt='Play Icon' />
					<img className='carousel-item__details--img' src={plusIcon} alt='Plus Icon' />
				</div>
				<p className='carousel-item__details--title'>Descriptive Title</p>
				<p className='carousel-item__details--subtitle'>2019 16+ 114 minutes</p>
			</div>
		</div>
	);
};

export default Item;
