import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import '@styles/components/Search.scss';

function useFilter(items) {
	const [query, setQuery] = useState('');
	const [filteredItems, setFilteredItems] = useState(items);

	useMemo(() => {
		const newItems = items.filter(item => {
			return item.title.toLowerCase().includes(query.toLowerCase()); //Filter Items
		});

		if (newItems.length !== filteredItems.length) {
			//Set New Items
			setFilteredItems(newItems);
		}
	}, [query]);

	return [query, setQuery, filteredItems];
}

const Search = props => {
	const [query, setQuery, filteredItems] = useFilter(props.items);

	return (
		<section className='main'>
			<h2 className='main__title'>¿Qué quieres ver hoy?</h2>
			<input
				type='text'
				className='input'
				placeholder='Search...'
				onChange={e => setQuery(e.target.value)}
			/>
		</section>
	);
};

const mapStateToProps = state => ({
	items: [...state.trends, ...state.originals],
});

export default connect(mapStateToProps)(Search);
