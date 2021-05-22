import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as favoritesActions from '../actions/actions';

import '../styles/components/Item.scss';

const Item = props => {
	const { id, title, cover, year, contentRating, duration } = props;

	//Save New Favorite
	const saveAsFavorite = () => {
		props.setFavorite({
			id,
			title,
			cover,
			year,
			contentRating,
			duration,
		});
	};

	return (
		<div className='carousel-item'>
			<img className='carousel-item__img' src={cover} alt='' />
			<div className='carousel-item__details'>
				<div>
					<Link to={`/video/${id}`}>
						<img
							className='carousel-item__details--img'
							src='assets/play-icon.png'
							alt='play video'
						/>
					</Link>

					{!props.isFavorite && (
						<img
							className='carousel-item__details--img'
							src='assets/plus-icon.png'
							alt='Plus Icon'
							onClick={saveAsFavorite}
						/>
					)}
					{props.isFavorite && (
						<img
							className='carousel-item__details--img'
							src='assets/remove-icon.svg'
							alt='delete'
							onClick={() => props.deleteFavorite(id)}
						/>
					)}
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

export default connect(null, favoritesActions)(Item);
