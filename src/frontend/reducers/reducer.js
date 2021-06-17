export default (state, action) => {
	switch (action.type) {
		case 'SET__FAVORITE':
			const exists = state.myList.find(item => item.id === action.payload.id);
			if (exists) {
				alert('You already have this item in your List!');
				return state;
			} else {
				return { ...state, error: null, myList: [...state.myList, action.payload] };
			}
		case 'DELETE__FAVORITE':
			return {
				...state,
				error: null,
				//Let only the items that dont match with deleted id
				myList: state.myList.filter(item => item.id !== action.payload),
			};
		case 'LOGIN':
		case 'LOGOUT':
		case 'REGISTER':
			return { ...state, error: null, user: action.payload };
		case 'SET_PLAYING':
			return {
				...state,
				error: null,
				playing:
					state.trends.find(item => item.id === Number(action.payload)) ||
					state.originals.find(item => item.id === Number(action.payload)) ||
					[],
			};
		case 'FILTERED_ITEMS':
			return { ...state, searchItems: action.payload };
		case 'ERROR':
			return { ...state, error: action.payload };
		default:
			return state;
	}
};
