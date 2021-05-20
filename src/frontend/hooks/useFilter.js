import { useMemo, useState } from 'react';

function useFilter(items) {
	const [query, setQuery] = useState('');
	const [filteredItems, setFilteredItems] = useState([]);

	useMemo(() => {
		if (query) {
			const newItems = items.filter(item => {
				return item.title.toLowerCase().includes(query.toLowerCase()); //Filter Items
			});

			setFilteredItems(newItems);
		} else {
			setFilteredItems([]);
		}
	}, [query]);

	return [query, setQuery, filteredItems];
}

export default useFilter;
