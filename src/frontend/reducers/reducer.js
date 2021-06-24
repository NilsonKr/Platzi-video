export default (state, action) => {
	switch (action.type) {
		case 'SET__FAVORITE':
			const exists = state.myList.find(item => item.id === action.payload.id);
			if (exists) {
				alert('You already have this item in your List!');
				return state;
			} else {
				return { ...state, error: null, loading: false, myList: [...state.myList, action.payload] };
			}
		case 'DELETE__FAVORITE':
			return {
				...state,
				error: null,
				loading: false,
				//Let only the items that dont match with deleted id
				myList: state.myList.filter(item => item.refId !== action.payload),
			};
		case 'LOGIN':
		case 'LOGOUT':
		case 'REGISTER':
			return { ...state, error: null, loading: false, user: action.payload };
		case 'SET_PLAYING':
			return {
				...state,
				error: null,
				loading: false,
				playing:
					state.trends.find(item => item.id === action.payload) ||
					state.originals.find(item => item.id === action.payload) ||
					{},
			};
		case 'FILTERED_ITEMS':
			return { ...state, loading: false, searchItems: action.payload };
		case 'ERROR':
			return { ...state, loading: false, error: action.payload };
		case 'LOADING':
			return { ...state, loading: true, error: null };
		default:
			return state;
	}
};
