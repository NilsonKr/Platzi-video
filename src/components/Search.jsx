import React, { useEffect } from 'react';
import useFilter from '../hooks/useFilter';
import { connect } from 'react-redux';
import { filteredItems } from '../actions/actions';

import '@styles/components/Search.scss';

const Search = props => {
	const [query, setQuery, filteredItems] = useFilter(props.items);

	//Set Filtered Items
	useEffect(() => {
		props.filteredItems(filteredItems);
	}, [filteredItems]);

	return (
		<section className='main'>
			<h2 className='main__title'>¿Qué quieres ver hoy?</h2>
			<input
				type='text'
				className='input'
				placeholder='Search...'
				value={query}
				onChange={e => setQuery(e.target.value)}
			/>
		</section>
	);
};

const mapStateToProps = state => ({
	items: [...state.trends, ...state.originals],
	searchItems: state.searchItems,
});

const mapDispatchToProps = {
	filteredItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
