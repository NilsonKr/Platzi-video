import React from 'react';
import useInitialState from '@hooks/useInitialState';

import Header from '@components/Header';
import Search from '@components/Search';
import Categories from '@components/Categories';
import Carousel from '@components/Carousel';
import CarouselItem from '@components/Item';
import Footer from '@components/Footer';

const API = 'http://localhost:3000/initialState';

const Home = () => {
	const initialState = useInitialState(API);

	return (
		<div className='Home'>
			<Header />
			<Search />

			{initialState.mylist.length > 0 && (
				<Categories title='My List'>
					<Carousel>
						{initialState.mylist.map(item => (
							<CarouselItem key={item.id} data={item} />
						))}
					</Carousel>
				</Categories>
			)}

			<Categories title='Trending'>
				<Carousel>
					{initialState.trends.map(item => (
						<CarouselItem key={item.id} {...item} />
					))}
				</Carousel>
			</Categories>

			<Categories title='Originals'>
				<Carousel>
					{initialState.originals.map(item => (
						<CarouselItem key={item.id} {...item} />
					))}
				</Carousel>
			</Categories>

			<Footer />
		</div>
	);
};

export default Home;
