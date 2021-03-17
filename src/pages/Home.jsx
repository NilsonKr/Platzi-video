import React, {Component} from 'react';
import Header from '@components/Header';
import Search from '@components/Search';
import Categories from '@components/Categories';
import Carousel from '@components/Carousel';
import CarouselItem from '@components/Item';

export class Home extends Component {
	render() {
		return (
			<div className='Home'>
				<Header />
				<Search />

				<Categories>
					<Carousel>
						<CarouselItem />
						<CarouselItem />
						<CarouselItem />
						<CarouselItem />
						<CarouselItem />
					</Carousel>
				</Categories>
			</div>
		);
	}
}

export default Home;
