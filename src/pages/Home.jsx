import React from 'react';
import { connect } from 'react-redux';
// import useInitialState from '@hooks/useInitialState';

import Search from '@components/Search';
import Categories from '@components/Categories';
import Carousel from '@components/Carousel';
import CarouselItem from '@components/Item';

const Home = props => {
	return (
		<div className='Home'>
			<Search />

			{props.myList.length > 0 && (
				<Categories title='My List'>
					<Carousel>
						{props.myList.map(item => (
							<CarouselItem key={item.id} {...item} isFavorite />
						))}
					</Carousel>
				</Categories>
			)}

			<Categories title='Trending'>
				<Carousel>
					{props.trends.map(item => (
						<CarouselItem key={item.id} {...item} />
					))}
				</Carousel>
			</Categories>

			<Categories title='Originals'>
				<Carousel>
					{props.originals.map(item => (
						<CarouselItem key={item.id} {...item} />
					))}
				</Carousel>
			</Categories>
		</div>
	);
};

const mapStateToProps = state => ({
	myList: state.myList,
	trends: state.trends,
	originals: state.originals,
});

export default connect(mapStateToProps)(Home);
