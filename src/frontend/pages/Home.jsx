import React from 'react';
import { connect } from 'react-redux';
// import useInitialState from '@hooks/useInitialState';
import Header from '../components/Header';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/Item';

const Home = props => {
	return (
		<>
			<Header />
			<div className='Home'>
				<Search />

				{props.searchItems.length > 0 && (
					<Categories title='Search'>
						<Carousel>
							{props.searchItems.map(item => (
								<CarouselItem key={item.id} {...item} />
							))}
						</Carousel>
					</Categories>
				)}

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
		</>
	);
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Home);
